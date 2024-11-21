"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { createPageURL, createPagination } from "@/functions/pagination"

interface PaginationProps {
  totalPages: number
}

export function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname() || "/"
  const searchParams = useSearchParams() || new URLSearchParams()

  const { currentPage, nextPage, prevPage } = createPagination(searchParams, totalPages)

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link href={createPageURL(currentPage - 1, searchParams, pathname)} rel="prev">
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={createPageURL(currentPage + 1, searchParams, pathname)} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
