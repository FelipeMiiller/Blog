import { handleException } from "@/server/common/http/handle-exception"
import { handleNotionWebhook } from "@/server/modules/notion/notion.controller"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get("x-notion-signature")
    const result = await handleNotionWebhook(body, signature)

    return Response.json(result)
  } catch (error) {
    return handleException(error)
  }
}
