//https://nextjs.org/docs/app/building-your-application/routing/route-handlers#cors

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

  res
    .status(200)

    .json({ data: posts, message: "Success", status: 200 })

  //  res
  //  .status(200)
  //    .writeHead(200, "Success", {
  //    "Access-Control-Allow-Origin": [
  //       envConfigs.site.baseUrl,
  //        normalizeWWW(envConfigs.site.baseUrl),
  //       "http://localhost:3000",
  //      ],
  //     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  //    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  //  })
  //  .json({ data: posts, message: "Success", status: 200 })
}
