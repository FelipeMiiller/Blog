export function createPagination(
  searchParams: URLSearchParams,
  totalPages: number
): {
  currentPage: number
  prevPage: boolean
  nextPage: boolean
} {
  const currentPage = Number(searchParams.get("page")) === 0 ? 1 : Number(searchParams.get("page"))

  const prevPage = currentPage > 1
  const nextPage = currentPage + 1 <= totalPages

  return {
    currentPage,
    prevPage,
    nextPage,
  }
}

export const createPageURL = (pageNumber: number | string, searchParams: URLSearchParams, pathname: string): string => {
  const params = new URLSearchParams(searchParams)
  params.set("page", pageNumber.toString())

  return `${pathname}?${params.toString()}`
}
