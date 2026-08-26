# Pesquisa de sincronização Notion → Next.js

## Fontes oficiais consultadas

- Notion Webhooks: https://developers.notion.com/reference/webhooks
- Notion Event types & delivery: https://developers.notion.com/reference/webhooks-events-delivery
- Next.js `revalidatePath`: https://nextjs.org/docs/app/api-reference/functions/revalidatePath
- Next.js `revalidateTag`: https://nextjs.org/docs/app/api-reference/functions/revalidateTag

## Constatações

O Notion oferece webhooks por meio de uma conexão, enviando POSTs para um endpoint público HTTPS. A assinatura precisa ser criada e verificada nas configurações da conexão; o primeiro POST contém `verification_token` e os eventos posteriores incluem `X-Notion-Signature` com HMAC-SHA256. O SDK JavaScript oficial a partir da versão 5.23.0 possui `verifyWebhookSignature()`.

Os webhooks notificam mudanças como `page.content_updated`, `page.created`, `page.deleted`, `page.moved`, `page.properties_updated`, `page.undeleted`, `data_source.content_updated` e eventos relacionados ao banco. O payload é um sinal de mudança, não o conteúdo completo; o servidor deve consultar novamente o Notion usando o ID da entidade. Alguns eventos são agregados e podem atrasar cerca de um minuto; o Notion recomenda buscar o estado mais recente. Em caso de falha de confirmação, há até oito tentativas ao longo de aproximadamente 24 horas.

No Next.js 16, `revalidateTag(tag, "max")` marca dados tagueados como obsoletos e permite stale-while-revalidate. Em Route Handlers chamados por webhook, `revalidateTag(tag, { expire: 0 })` expira imediatamente o dado; `revalidatePath(path, type)` marca páginas específicas para revalidação na próxima visita. Portanto, a implementação deve combinar tags para consultas do Notion com invalidação das páginas `/`, `/blog` e `/blog/post/[slug]`.

## Diagnóstico do projeto

`envConfigs.pages.revalidate` está configurado para 24 horas, mas não estava conectado às rotas nem aos dados do Notion. As páginas não exportavam `revalidate`, não havia cache tagueado, não existia Route Handler para receber webhook e o SDK estava na versão 2.2.15, abaixo da versão que documenta `verifyWebhookSignature()`. O layout raiz também não exportava `metadata`, não existiam `sitemap.ts` ou `robots.ts`, e os metadados Open Graph não possuíam imagem nem canonical explícito.
