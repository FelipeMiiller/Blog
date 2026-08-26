export const envConfigs = {
  site: {
    baseUrl: process.env.APP_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
  pages: {
    posts_per_page: 5,
    revalidate: 60 * 60 * 24,
  },
  notion: {
    dataSourcePosts: process.env.NOTION_DATA_SOURCE_POSTS_ID || process.env.NOTION_DATABASE_POSTS_ID,
    apiKey: process.env.NOTION_API_KEY,
    webhookVerificationToken: process.env.NOTION_WEBHOOK_VERIFICATION_TOKEN,
    cacheTag: "notion-posts",
  },
  github: {
    accessToken: process.env.GITHUB_ACCESS_TOKEN,
    owner: process.env.GITHUB_OWNER,
  },
}
