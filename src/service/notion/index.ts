import { unstable_cache } from "next/cache"
import { envConfigs } from "@/config"
import { tagDoPost } from "@/functions/cache-tags"
import { slugify } from "@/functions/slugify"
import { type Post, type Serie } from "@/types"
import { APIResponseError, Client } from "@notionhq/client"
import { QueryDataSourceParameters } from "@notionhq/client/build/src/api-endpoints"
import { NotionToMarkdown } from "notion-to-md"

type WithAuth<P> = P & {
  auth?: string
}
type NotionAnnotations = {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

type NotionText = {
  content: string
  link: null
}

type NotionRichTextElement = {
  type: string
  text: NotionText
  annotations: NotionAnnotations
  plain_text: string
  href: null
}

type NotionTitleElement = {
  type: string
  text: NotionText
  annotations: NotionAnnotations
  plain_text: string
  href: string
}

type NotionPerson = {
  object: string
  id: string
  name: string
  avatar_url: string
  type: string
  person: { email: string }
}

type NotionMultiSelect = {
  id: string
  name: string
  color: string
}

type NotionFormulaValue = {
  type: string
  string?: string | null
}

type NotionPropertyValue = {
  id: string
  type: string
  created_time: string
  last_edited_time?: string
  checkbox?: boolean
  multi_select: NotionMultiSelect[]
  people: NotionPerson[]
  rich_text: NotionRichTextElement[]
  title: NotionTitleElement[]
  formula?: NotionFormulaValue
  select?: { id: string; name: string; color: string } | null
}

type Properties = {
  [key: string]: NotionPropertyValue
}

type Page = {
  id: string
  url: string
  public_url: string
  properties: Properties
}

export type NotionQueryResponse = Array<Page>

interface NotionInterface {
  query(args: Omit<WithAuth<QueryDataSourceParameters>, "data_source_id">): Promise<Post[]>
  getPageMarkdown(pageId: string): Promise<string>
}

class Notion implements NotionInterface {
  readonly dataSourceId = envConfigs.notion.dataSourcePosts as string
  private readonly isConfigured = Boolean(envConfigs.notion.apiKey && envConfigs.notion.dataSourcePosts)
  private n2m: NotionToMarkdown
  private readonly cachedQuery: (args: Omit<WithAuth<QueryDataSourceParameters>, "data_source_id">) => Promise<Post[]>
  // Uma instância de `unstable_cache` por page id. O motivo é que `tags` é
  // estático na criação do cache: não dá para montar `notion-post-${pageId}`
  // dentro de um único cache que recebe o pageId como argumento. Cada instância
  // nasce com a tag já resolvida, e o webhook expira só a do post que mudou.
  // Recriar a instância a cada invocação do servidor é inofensivo: as mesmas
  // `keyParts` e as mesmas `tags` apontam para a mesma entrada do cache.
  private readonly markdownPorPage = new Map<string, (pageId: string) => Promise<string>>()

  constructor(protected notion = new Client({ auth: envConfigs.notion.apiKey })) {
    this.n2m = new NotionToMarkdown({ notionClient: notion })
    this.cachedQuery = unstable_cache(
      (args: Omit<WithAuth<QueryDataSourceParameters>, "data_source_id">) => this.queryUncached(args),
      ["notion-query"],
      { revalidate: envConfigs.pages.revalidate, tags: [envConfigs.notion.cacheTag] }
    )
  }

  private getCachedPageMarkdown(pageId: string): (pageId: string) => Promise<string> {
    const existente = this.markdownPorPage.get(pageId)
    if (existente) return existente

    const criado = unstable_cache(
      (id: string) => this.getPageMarkdownUncached(id),
      ["notion-page-markdown", pageId],
      {
        revalidate: envConfigs.pages.revalidate,
        tags: [tagDoPost(pageId)],
      }
    )

    this.markdownPorPage.set(pageId, criado)
    return criado
  }

  private shouldUseContentFallback(error: unknown): boolean {
    return error instanceof APIResponseError && (error.status === 401 || error.status === 403)
  }

  private handleError(error: unknown): never {
    if (error instanceof APIResponseError) {
      const { name, code, message, status } = error
      throw new Error(`Notion API Error: ${name} (${code}) - ${message}. Status: ${status}`)
    } else if (error instanceof Error) {
      throw new Error(`Unexpected error: ${error.message}`)
    }
    throw new Error("Unknown error occurred")
  }

  async query(args: Omit<WithAuth<QueryDataSourceParameters>, "data_source_id">): Promise<Post[]> {
    if (!this.isConfigured) {
      return []
    }

    return this.cachedQuery(args)
  }

  private async queryUncached(args: Omit<WithAuth<QueryDataSourceParameters>, "data_source_id">): Promise<Post[]> {
    try {
      const { results } = await this.notion.dataSources.query({
        data_source_id: this.dataSourceId,
        ...args,
      })
      return this.normalizeResponseQuery(results as unknown as NotionQueryResponse)
    } catch (error) {
      if (this.shouldUseContentFallback(error)) {
        return []
      }
      this.handleError(error)
    }
  }

  async getPageMarkdown(pageId: string): Promise<string> {
    if (!this.isConfigured) {
      return ""
    }

    return this.getCachedPageMarkdown(pageId)(pageId)
  }

  private async getPageMarkdownUncached(pageId: string): Promise<string> {
    try {
      const mdblocks = await this.n2m.pageToMarkdown(pageId)
      return this.n2m.toMarkdownString(mdblocks).parent
    } catch (error) {
      if (this.shouldUseContentFallback(error)) {
        return ""
      }
      this.handleError(error)
    }
  }

  private normalizeResponseQuery(rows: NotionQueryResponse): Post[] {
    return rows.filter(this.isValidRow).map(this.mapRowToPost)
  }

  private isValidRow = (row: Page): boolean => {
    return !!(
      row.properties?.Page?.title?.[0]?.text?.content &&
      row.properties?.Authors?.people &&
      row.properties?.Created?.created_time &&
      row.properties?.Description?.rich_text?.[0]?.text?.content &&
      row.properties?.Categories?.multi_select
    )
  }

  /**
   * Slug vindo da coluna de fórmula do Notion (`URL`).
   *
   * A fórmula devolve o slug já percent-encoded — `busca-h%C3%ADbrida-...` —
   * porque é assim que a coluna serve para colar a URL pronta. O resto do site
   * trabalha com o slug cru e aplica `encodeURIComponent` só na hora de montar
   * o link (`page.tsx` e `getMetada` decodificam o parâmetro da rota, o sitemap
   * e o canonical codificam). Decodificar aqui mantém esse contrato: sem isso
   * todo consumidor passaria a codificar duas vezes e a URL viraria
   * `...%25C3%25AD...`, que não casa com nenhuma rota.
   *
   * Coluna vazia ou com escape inválido devolve string vazia. A postagem não é
   * pulada por isso: `isValidRow` não olha slug, então ela continua na
   * listagem do blog — apenas não ganha página própria.
   */
  private readSlugFromNotion(row: Page): string {
    const propriedades = row.properties ?? {}
    // `URL` é o nome que a coluna tem no database desde que virou fórmula. O
    // segundo matcher é rede de segurança caso ela seja renomeada.
    const chave =
      propriedades.URL ?? Object.entries(propriedades).find(([nome]) => /url|slug/i.test(nome))?.[1]

    const bruto = chave?.formula?.string
    if (typeof bruto !== "string" || bruto.trim() === "") {
      return ""
    }

    try {
      const decodificado = decodeURIComponent(bruto)
      return decodificado.trim() === "" ? "" : decodificado
    } catch {
      return ""
    }
  }

  /**
   * Série do post, da coluna `Serie` do Notion.
   *
   * `select` de valor único, e opcional: os 59 posts que existiam antes da
   * série RAG têm a coluna vazia, e é por isso que `isValidRow` não a exige —
   * exigi-la apagaria da listagem tudo que foi publicado até hoje.
   */
  private readSerieFromNotion(row: Page): Serie | null {
    const sel = row.properties?.Serie?.select

    if (!sel?.name) {
      return null
    }

    return { id: sel.id, name: sel.name, color: sel.color }
  }

  private mapRowToPost = (row: Page): Post => {
    return {
      slug: this.readSlugFromNotion(row),
      page: row.id,
      authors: row.properties.Authors.people,
      title: row.properties.Page.title[0].text.content,
      updated: row.properties.Updated.last_edited_time,
      created: row.properties.Created.created_time,
      description: row.properties.Description.rich_text[0].text.content,
      serie: this.readSerieFromNotion(row),
      tags: row.properties.Categories.multi_select.map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        slug: slugify(item.name),
      })),
    }
  }
}

const notion = new Notion()

export default notion
