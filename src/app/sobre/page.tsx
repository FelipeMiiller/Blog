import { Fragment, Suspense } from "react"
import { getReadmeContent } from "@/service/github"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MarkdownContent } from "@/components/markdown-component"

import { Footer, Header } from "../components"

export default function BlogReadme() {
  return (
    <Fragment>
      <Header />
      <Card className="mt-14">
        <CardContent>
          <Suspense fallback={<ReadmeSkeleton />}>
            <ReadmeContent />
          </Suspense>
        </CardContent>
      </Card>
      <Footer />
    </Fragment>
  )
}

async function ReadmeContent() {
  const content = await getReadmeContent()
  return (
    <article className="container mx-auto px-4 py-10 lg:pt-16 lg:pb-28">
      <MarkdownContent content={content} />
    </article>
  )
}

function ReadmeSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
      <Skeleton className="h-4 w-[300px]" />
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  )
}
