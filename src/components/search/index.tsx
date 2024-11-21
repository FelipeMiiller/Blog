"use client"

import { useEffect, useState } from "react"
import { getDataPosts } from "@/service/notion/posts"
import { NotionPost } from "@/types"

import { Button } from "@/components/ui/button"
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Icons } from "@/components/icons/icons"

import { Group } from "./group"

export default function DialogSearch() {
  const [open, setOpen] = useState(false)
  const [posts, setPosts] = useState<NotionPost[]>([])

  useEffect(() => {
    startFetching()
  }, [])

  async function startFetching() {
    setPosts(await getDataPosts())
  }
  return (
    <>
      <Button variant="ghost" size={"icon"} onClick={() => setOpen(true)}>
        <Icons.search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {posts.length > 0 ? <Group list={posts} heading="Posts" /> : null}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
