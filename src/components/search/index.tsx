"use client"

import { Fragment, useState } from "react"
import { Post } from "@/types"
import { DialogTitle } from "@radix-ui/react-dialog"

import { Button } from "@/components/ui/button"
import { CommandDialog, CommandEmpty, CommandInput, CommandList, CommandSeparator } from "@/components/ui/command"
import { Icons } from "@/components/icons/icons"

import { Group } from "./group"

export default function DialogSearch({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Button variant="ghost" size={"icon"} onClick={() => setOpen(true)}>
        <Icons.search />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle>
          <CommandInput placeholder="search..." />
        </DialogTitle>
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {posts.length > 0 ? <Group list={posts} heading="Posts" /> : <></>}
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </Fragment>
  )
}
