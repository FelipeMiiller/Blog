/* eslint-disable no-useless-escape */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// eslint-disable-next-line no-unused-vars
type FormateDate = (date: string | Date, locale?: string) => string

export const formateDate: FormateDate = (date, locale = "pt-BR") => {
  const handlerDate = new Date(date)

  return handlerDate.toLocaleString(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
}

export function readingTime(post: string): {
  wordCount: number
  readingTime: number
} {
  const WORDS_PER_MINUTE = 300

  // Matches words
  // See https://regex101.com/r/q2Kqjg/6
  const regex = /\w+/g

  const words = post.match(regex)
  const wordCount = words ? words.length : 0
  const readingTime = Math.ceil(wordCount / WORDS_PER_MINUTE)

  return {
    wordCount,
    readingTime,
  }
}

export const extractHeadings = (
  markdown: string
): {
  level: number
  text: string
  id: string
}[] => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings = []
  let match

  while ((match = headingRegex.exec(markdown)) !== null) {
    let text = match[2]
    // Remove asteriscos do início e do final do texto
    text = text.replace(/^\*+|\*+$/g, "").trim()
    headings.push({
      level: match[1].length,
      text: text,
      id: text
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^\-+|\-+$/g, "")
        .trim(),
    })
  }

  return headings
}

export const buildPathAndPage = ({
  slug,
  basePath,
}: {
  slug: string[] | undefined
  basePath: string
}): { href: string; currentPage: number; paths: string[] | undefined } => {
  if (!slug) {
    return { href: basePath, currentPage: 1, paths: undefined }
  }

  const pageIndex = slug.indexOf("page")

  if (pageIndex === -1) {
    return { href: basePath + slug.join("/"), currentPage: 1, paths: slug }
  }

  return {
    href: basePath + slug.slice(0, pageIndex).join("/"),
    currentPage: Number(slug[pageIndex + 1]),
    paths: slug.slice(0, pageIndex),
  }
}
