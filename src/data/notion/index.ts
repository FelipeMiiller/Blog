import { APIResponseError, Client } from "@notionhq/client"
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"
import GithubSlugger from "github-slugger"
import { NotionToMarkdown } from "notion-to-md"

import { siteConfigs } from "@/config/site"

type WithAuth<P> = P & {
  auth?: string
}

type properties = {
  [key: string]: {
    id: string
    type: string
    created_time: string
    last_edited_time?: string
    checkbox?: boolean
    multi_select: { id: string; name: string; color: string }[]
    people: {
      object: string
      id: string
      name: string
      avatar_url: string
      type: string
      person: { email: string }
    }[]

    rich_text: {
      type: string
      text: { content: string; link: null }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: null
    }[]
    title: {
      type: string
      text: { content: string; link: null }
      annotations: {
        bold: boolean
        italic: boolean
        strikethrough: boolean
        underline: boolean
        code: boolean
        color: string
      }
      plain_text: string
      href: string
    }[]
  }
}

type Page = {
  id: string
  url: string
  public_url: string
  properties: properties
}
export type NotionPostData = {
  slug: string
  page: string
  title: string
  created: string
  updated?: string
  description: string
  authors: {
    object: string
    id: string
    name: string
    avatar_url: string
    type: string
    person: { email: string }
  }[]
  tags: { id: string; name: string; color: string; slug: string }[]
}

export type NotionQueryResponse = Array<Page>

interface Notion {
  query(args: Omit<WithAuth<QueryDatabaseParameters>, "database_id">): Promise<NotionPostData[]>
}

class Notion implements Notion {
  readonly databaseId = siteConfigs.notion.dataBasePosts as string
  private n2m: NotionToMarkdown
  constructor(protected notion = new Client({ auth: siteConfigs.notion.apiKey })) {
    this.n2m = new NotionToMarkdown({ notionClient: notion })
  }

  async query(
    args: Omit<WithAuth<QueryDatabaseParameters>, "database_id">
  ): Promise<NotionPostData[]> {
    try {
      const { results } = await this.notion.databases.query({
        database_id: this.databaseId,
        ...args,
      })

      return this.normalizeResponseQuery(results as unknown as NotionQueryResponse)
    } catch (error) {
      if (error instanceof APIResponseError) {
        const { name, code, message, status } = error
        throw new Error(`Notion API Error: ${name} (${code}) - ${message}. Status: ${status}`)
      } else if (error instanceof Error) {
        throw new Error(`Unexpected error: ${error.message}`)
      } else {
        throw new Error("Unknown error occurred")
      }
    }
  }

  async getPageMarkdown(pageId: string): Promise<string> {
    try {
      const mdblocks = await this.n2m.pageToMarkdown(pageId)
      const mdString = this.n2m.toMarkdownString(mdblocks).parent
      return mdString
    } catch (error) {
      if (error instanceof APIResponseError) {
        const { name, code, message, status } = error
        throw new Error(`Notion API Error: ${name} (${code}) - ${message}. Status: ${status}`)
      } else if (error instanceof Error) {
        throw new Error(`Unexpected error: ${error.message}`)
      } else {
        throw new Error("Unknown error occurred")
      }
    }
  }

  private normalizeResponseQuery(rows: NotionQueryResponse): NotionPostData[] {
    return rows.map((row) => ({
      slug: new GithubSlugger().slug(row.properties?.Page.title[0].text.content),
      page: row.id,
      authors: row.properties?.Authors.people,
      title: row.properties?.Page.title[0].text.content,
      updated: row.properties?.Updated.last_edited_time,
      created: row.properties?.Created.created_time,
      description: row.properties?.Description.rich_text[0].text.content,
      tags: (row.properties?.Categories.multi_select).map((item) => ({
        id: item.id,
        name: item.name,
        color: item.color,
        slug: new GithubSlugger().slug(item.name),
      })),
    }))
  }
}

export default Notion
