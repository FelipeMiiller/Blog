import Link from "next/link"

import { Search } from "./search/search-input"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface LinkCardProps {
  documentId: string
  title: string
  summary: string
}

function LinkCard({ documentId, title, summary }: Readonly<LinkCardProps>) {
  return (
    <Link href={`/dashboard/summaries/${documentId}`}>
      <Card className="relative">
        <CardHeader>
          <CardTitle className="leading-8 text-pink-500">{title || "Video Summary"}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="w-full mb-4 leading-7">{summary.slice(0, 164) + " [read more]"}</p>
        </CardContent>
      </Card>
    </Link>
  )
}

interface SearchParamsProps {
  searchParams?: {
    query?: string
  }
}

export default async function SummariesRoute({ searchParams }: Readonly<SearchParamsProps>) {
  const data = [
    {
      documentId: "1",
      title: "Video 1",
      summary: "Summary 1",
    },
    {
      documentId: "2",
      title: "Video 2",
      summary: "Summary 2",
    },
    {
      documentId: "3",
      title: "Video 3",
      summary: "Summary 3",
    },
  ]

  //const { data } = await getSummaries()
  // this will gran our search params from the URL that we will pass to our getSummaries function
  const query = searchParams?.query ?? ""
  if (!data) return null
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <Search />
      <span>Query: {query}</span>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((item: LinkCardProps) => (
          <LinkCard key={item.documentId} {...item} />
        ))}
      </div>
    </div>
  )
}
