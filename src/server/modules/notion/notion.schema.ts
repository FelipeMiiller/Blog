import { z } from "zod"

export const notionWebhookVerificationSchema = z.object({
  verification_token: z.string().min(1),
})

export const notionWebhookEventSchema = z
  .object({
    id: z.string().uuid(),
    timestamp: z.string().datetime({ offset: true }),
    type: z.string().min(1),
    entity: z.object({
      id: z.string().min(1),
      type: z.string().min(1),
    }),
  })
  .passthrough()

export type NotionWebhookEvent = z.infer<typeof notionWebhookEventSchema>
