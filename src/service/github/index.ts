//https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28

import { envConfigs } from "@/config"

const buildFallbackContent = `# Sobre este Blog

Este espaço reúne anotações e materiais sobre desenvolvimento de software.

O conteúdo do perfil é sincronizado a partir do GitHub quando as credenciais de integração estão disponíveis.`

export async function getReadmeContent(): Promise<string> {
  const { accessToken, owner } = envConfigs.github
  const repo = owner
  const path = "README.md"

  if (!accessToken) {
    return buildFallbackContent
  }

  const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  })

  if (!response.ok) {
    return buildFallbackContent
  }

  const data = await response.json()

  if (!data.content) {
    return buildFallbackContent
  }

  // The content is base64 encoded, so we need to decode it
  return Buffer.from(data.content, "base64").toString("utf-8")
}
