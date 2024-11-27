import type { NextApiRequest, NextApiResponse } from "next"
import { envConfigs } from "@/config"
import { getPostsInOrderForPublished } from "@/service/notion/posts"
import { NotionPost, ResponseData } from "@/types"

export const dynamic = "force-static"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData<NotionPost[]>>) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed", status: 405 })
    return
  }

  const posts = await getPostsInOrderForPublished(false)

  if (!posts || posts.length === 0) {
    res.status(404).json({ message: "Not found", status: 404 })
    return
  }
  return new Response(JSON.stringify({ data: posts, message: "Success", status: 200 }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": envConfigs.site.baseUrl,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  })
}
