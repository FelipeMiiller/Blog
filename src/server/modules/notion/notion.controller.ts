import { revalidatePath, revalidateTag } from "next/cache"
import { envConfigs } from "@/config"
import { Exception } from "@/server/common/http/exception"
import { HTTP_STATUS } from "@/server/common/http/http-status"
import { verifyWebhookSignature } from "@notionhq/client"

import { notionWebhookEventSchema, notionWebhookVerificationSchema, type NotionWebhookEvent } from "./notion.schema"

const CONTENT_EVENT_PREFIXES = ["page.", "database.", "data_source."]

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

function revalidateBlogContent(event: NotionWebhookEvent): void {
  if (!CONTENT_EVENT_PREFIXES.some((prefix) => event.type.startsWith(prefix))) {
    return
  }

  revalidateTag(envConfigs.notion.cacheTag, { expire: 0 })
  revalidatePath("/", "page")
  revalidatePath("/blog/[[...slug]]", "page")
  revalidatePath("/blog/post/[slug]", "page")
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
