import { envConfigs } from "@/config"

/**
 * Tag de cache de UM post, derivada do page id do Notion.
 *
 * Fica em um módulo só porque dois lugares precisam concordar exatamente com a
 * string: quem cria o `unstable_cache` da markdown (`service/notion/index.ts`) e
 * quem expira no webhook (`server/modules/notion/notion.controller.ts`). Se as
 * duas divergirem uma letra, a invalidação não acerta nada e o sintoma é
 * silencioso — o post simplesmente continua velho.
 *
 * O page id serve de chave porque é exatamente o que o `entity.id` do payload do
 * webhook traz. Não precisa consultar a API nem montar mapa page id -> slug.
 */
export function tagDoPost(pageId: string): string {
  return `${envConfigs.notion.cacheTagPost}${pageId}`
}