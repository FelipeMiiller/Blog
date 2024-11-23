import { envConfigs } from "@/config"
import { NotionPost, ResponseData } from "@/types"
import { toast } from "sonner"

export async function getDataPosts(): Promise<NotionPost[]> {
  const url = `${envConfigs.site.baseUrl}/api/summaries`

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: envConfigs.pages.revalidate,
      },
    })
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`)
    }

    const { data, message }: ResponseData<NotionPost[]> = await response.json()

    if (!data || data.length === 0) {
      throw new Error(message)
    }
    return data
  } catch (error) {
    if (error instanceof Error) {
      toast.error(error.message)
    }
    toast.error("Error fetching data")
    return []
  }
}
