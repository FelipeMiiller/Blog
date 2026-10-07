export const envConfigs = {
  site: {
    baseUrl: process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  pages: {
    posts_per_page: 5,
    revalidate: 60 * 60 * 24,
    // Quantos posts são pré-construídos no deploy. Cada post custa uma
    // sequência de requisições ao Notion via `notion-to-md`, e uma página
    // lenta estoura o timeout do build e derruba o deploy inteiro. O resto
    // é gerado sob demanda no primeiro acesso (`dynamicParams = true`).
    prebuild_posts: 20,
  },
  notion: {
    dataSourcePosts: process.env.NOTION_DATA_SOURCE_POSTS_ID || process.env.NOTION_DATABASE_POSTS_ID,
    apiKey: process.env.NOTION_API_KEY,
    webhookVerificationToken: process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN,
    // Tag do cache da LISTA de posts (títulos, slugs, tags, datas). Uma
    // invalidate aqui derruba a home e a listagem do blog.
    cacheTag: "notion-posts",
    // Prefixo da tag de UM post. Como é por page id, o webhook expira só o
    // post que mudou, em vez de regenerar todos os 59.
    cacheTagPost: "notion-post-",
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    owner: process.env.GITHUB_OWNER,
  },
}
