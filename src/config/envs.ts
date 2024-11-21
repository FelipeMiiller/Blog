export const envConfigs = {
  site: {
    baseUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
  pages: {
    posts_per_page: 5,
    revalidate: 60 * 60 * 24 * 1,
  },
  notion: {
    dataBasePosts: process.env.NOTION_DATABASE_POSTS_ID,
    apiKey: process.env.NOTION_API_KEY,
  },
}
