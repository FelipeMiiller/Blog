import { APIResponseError, Client } from "@notionhq/client"
import { QueryDatabaseParameters } from "@notionhq/client/build/src/api-endpoints"

type WithAuth<P> = P & {
  auth?: string
}
type Page = {
  id: string
  properties: {
    [key: string]: {
      id: string
      type: string
      created_time: string
      last_edited_time?: string
      checkbox?: boolean
      multi_select: { id: string; name: string; color: string }[]
      people?: {
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
  url: string
  public_url: string
}
export type NormalizeResponseQuery = {
  page: string
  title: string
  created: string
  updated?: string
  description: string
  tags: { id: string; name: string; color: string }[]
}

export type NotionQueryResponse = Array<Page>

interface Notion {
  query(
    args: Omit<WithAuth<QueryDatabaseParameters>, "database_id">
  ): Promise<NormalizeResponseQuery[]>
}

class Notion implements Notion {
  readonly databaseId = process.env.NOTION_DATABASE_POSTS_ID as string
  constructor(protected notion = new Client({ auth: process.env.NOTION_API_KEY })) {}

  async query(
    args: Omit<WithAuth<QueryDatabaseParameters>, "database_id">
  ): Promise<NormalizeResponseQuery[]> {
    try {
      const { results } = await this.notion.databases.query({
        database_id: this.databaseId,
        ...args,
      })
      results
      return this.normalizeResponseQuery(results as unknown as NotionQueryResponse)
    } catch (error) {
      if (error instanceof APIResponseError) {
        const { name, code, message, status } = error

        console.log(message)
      }
      throw error
    }
  }

  private normalizeResponseQuery(rows: NotionQueryResponse): NormalizeResponseQuery[] {
    return rows.map((row) => ({
      page: row.id,
      title: row.properties?.Page.title[0].text.content ,
      updated: row.properties?.Updated.last_edited_time,
      created: row.properties?.Updated.created_time,
      description: row.properties?.Description.rich_text[0].text.content,
      tags: row.properties?.Categories.multi_select,
    }))
  }
}

export default Notion
