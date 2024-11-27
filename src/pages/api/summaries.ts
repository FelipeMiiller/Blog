import type { NextApiRequest, NextApiResponse } from "next"
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
  res.status(200).json({ data: posts, message: "Success", status: 200 })
}
