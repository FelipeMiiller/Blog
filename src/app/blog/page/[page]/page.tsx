
import { getSParams_Posts, getSProps_PostsInOrderForPublished } from '@/data/notion/posts'
import ListLayoutWithTags from '@/layouts/ListLayoutWithTags'




export const generateStaticParams = async () => await getSParams_Posts()
export const generateStaticProps = async () => await getSProps_PostsInOrderForPublished()


export default async function Page({ params }: { params: { page: string } }) {
  const { props: { posts, posts_per_page } } = await getSProps_PostsInOrderForPublished()

  const pageNumber = parseInt(params.page as string)
  const initialDisplayPosts = posts.slice(posts_per_page * (pageNumber - 1), posts_per_page * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / posts_per_page),
  }

  return (
    <ListLayoutWithTags
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="All Posts"
    />
  )
}
