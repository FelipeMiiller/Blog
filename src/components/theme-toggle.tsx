"use client"

import * as React from "react"
import { cn } from "@/utils/utils"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

import { Icons } from "./icons/icons"

export function ThemeToggle({ text = null }: { text?: string | null }) {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(text !== null ? "flex justify-between flex-1  px-0" : "")}
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {text}

      <Icons.sun name="icon-sun" className="h-[1.5rem] w-[1.3rem] dark:hidden" />
      <Icons.moon name="icon-moon" className="hidden h-5 w-5 dark:block" />
    </Button>
  )
}
