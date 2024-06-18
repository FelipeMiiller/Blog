import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type formateDate = (date: string | Date, locale?: string) => string

export const formateDate: formateDate = (date, locale = "pt-BR") => {
  const handlerDate = new Date(date)

  return handlerDate.toLocaleString(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
}
