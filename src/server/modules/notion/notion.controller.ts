import { revalidatePath, revalidateTag } from "next/cache"
import { envConfigs } from "@/config"
import { tagDoPost } from "@/functions/cache-tags"
import { Exception } from "@/server/common/http/exception"
import { HTTP_STATUS } from "@/server/common/http/http-status"
import { verifyWebhookSignature } from "@notionhq/client"

import { notionWebhookEventSchema, notionWebhookVerificationSchema, type NotionWebhookEvent } from "./notion.schema"

const CONTENT_EVENT_PREFIXES = ["page.", "database.", "data_source."]

// Propriedades que aparecem na listagem do blog, na home ou nos metadados do
// post. Mudou alguma delas, o cache da LISTA precisa cair. Editar o corpo do
// texto não toca nenhuma delas.
//
// `Serie` entrou na lista mesmo o selo aparecendo só na página do post: o objeto
// que a página usa (`getPostsInOrderForPublished`) vem do cache da LISTA, então
// trocar a série sem expirar essa tag deixaria o nome antigo no ar enquanto o
// corpo do post já estaria novo.
const PROPS_QUE_APARECEM_NA_LISTA = new Set([
  "Page",
  "Published",
  "Categories",
  "Description",
  "Priority",
  "Serie",
])

function parsePayload(body: string): unknown {
  try {
    return JSON.parse(body) as unknown
  } catch (cause) {
    throw new Exception(HTTP_STATUS.BAD_REQUEST, "Invalid JSON payload", cause, "INVALID_JSON")
  }
}

function isVerificationPayload(payload: unknown): payload is { verification_token: string } {
  return (
    notionWebhookVerificationSchema.safeParse(payload).success &&
    typeof payload === "object" &&
    payload !== null &&
    !("type" in payload)
  )
}

function assertWebhookConfigured(): string {
  const token = envConfigs.notion.webhookVerificationToken
  if (!token) {
    throw new Exception(
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      "Webhook verification is not configured",
      undefined,
      "WEBHOOK_NOT_CONFIGURED"
    )
  }
  return token
}

async function assertSignature(body: string, signature: string | null): Promise<void> {
  if (!signature) {
    throw new Exception(HTTP_STATUS.UNAUTHORIZED, "Missing Notion signature", undefined, "MISSING_SIGNATURE")
  }

  const isValid = await verifyWebhookSignature({
    body,
    signature,
    verificationToken: assertWebhookConfigured(),
  })

  if (!isValid) {
    throw new Exception(HTTP_STATUS.UNAUTHORIZED, "Invalid Notion signature", undefined, "INVALID_SIGNATURE")
  }
}

/**
 * Decide o que precisa ser invalidado, em vez de limpar tudo.
 *
 * Antes, qualquer evento de conteúdo derrubava a tag global do Notion e as três
 * rotas — o que significava regenerar a markdown dos 59 posts para editar uma
 * frase em um deles. Agora dá para acertar só o que mudou:
 *
 * - A markdown do post sai pela tag por page id, e o `entity.id` do payload já
 *   é esse id. Nada de consultar a API para descobrir qual post é.
 * - A lista (home, `/blog` e os metadados) só é invalidada quando a mudança
 *   mexe numa propriedade que aparece nela. Se o evento trouxer quais
 *   propriedades mudaram, respeitamos isso; se não trouxer, invalidamos a lista
 *   por precaução — ainda é muito mais barato que invalidar tudo.
 * - Mudança de schema (`database.`/`data_source.`) invalida a lista inteira,
 *   porque pode afetar qualquer página.
 */
function revalidateBlogContent(event: NotionWebhookEvent): void {
  if (!CONTENT_EVENT_PREFIXES.some((prefix) => event.type.startsWith(prefix))) {
    return
  }

  const entityId = event.entity?.id
  if (entityId) {
    revalidateTag(tagDoPost(entityId), { expire: 0 })
  }

  const mudouSchema = event.type.startsWith("database.") || event.type.startsWith("data_source.")

  const propriedadesAlteradas = (event as NotionWebhookEvent & { changed_properties?: unknown })
    .changed_properties

  const mexeuNaLista = mudouSchema
    ? true
    : Array.isArray(propriedadesAlteradas)
      ? propriedadesAlteradas.some((prop) => PROPS_QUE_APARECEM_NA_LISTA.has(String(prop)))
      : true

  if (!mexeuNaLista) {
    return
  }

  revalidateTag(envConfigs.notion.cacheTag, { expire: 0 })
  revalidatePath("/", "page")
  revalidatePath("/blog/[[...slug]]", "page")
}

export async function handleNotionWebhook(body: string, signature: string | null) {
  const payload = parsePayload(body)

  if (isVerificationPayload(payload)) {
    return { received: true, verification: true }
  }

  await assertSignature(body, signature)

  const parsedEvent = notionWebhookEventSchema.safeParse(payload)
  if (!parsedEvent.success) {
    throw new Exception(HTTP_STATUS.BAD_REQUEST, "Invalid Notion webhook event", parsedEvent.error, "INVALID_EVENT")
  }

  revalidateBlogContent(parsedEvent.data)

  return {
    received: true,
    eventId: parsedEvent.data.id,
    eventType: parsedEvent.data.type,
  }
}
