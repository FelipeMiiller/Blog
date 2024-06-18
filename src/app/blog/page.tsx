


import { genPageMetadata } from '../seo'
import { Footer, Header } from '../components'
import { getSProps_PostsInOrderForPublished } from '@/data/notion/posts'
import { ListLayoutWithTags } from '@/layouts'



export const metadata = genPageMetadata({ title: 'Blog' })

export default async function BlogPage() {
  const {props: { posts, posts_per_page }} = await getSProps_PostsInOrderForPublished()

  const pageNumber = 1
  const initialDisplayPosts = posts.slice(
    posts_per_page * (pageNumber - 1),
    posts_per_page * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / posts_per_page),
  }

  return (
    <>
      <Header titlePre="Blog" />
      <ListLayoutWithTags
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
      <Footer />

    </>
  )
}
