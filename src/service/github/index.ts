//https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28

import { envConfigs } from "@/config"

export async function getReadmeContent(): Promise<string> {
  const { accessToken, owner } = envConfigs.github
  const repo = owner
  const path = "README.md"

  if (!accessToken) {
    throw new Error("GitHub accessToken is not set in environment variables")
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch README content")
  }

  const data = await response.json()

  if (!data.content) {
    throw new Error("README content not found")
  }

  // The content is base64 encoded, so we need to decode it
  return Buffer.from(data.content, "base64").toString("utf-8")
}










