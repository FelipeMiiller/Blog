import Link from "next/link"
import { mainNavConfig } from "@/config"
import { NotionPost } from "@/types"
import { CommandGroup } from "cmdk"

import { TagsLink } from "../tagsLink"
import { CommandItem } from "../ui/command"

type Props = {
  heading: string
  list: NotionPost[]
}

export function Group({ heading, list }: Props) {
  return (
    <CommandGroup heading={heading} className="pt-1">
      {list.map((post) => {
        const { title, slug, tags, description } = post

        return (
          <CommandItem key={post.slug} className="cursor-pointer group inline-block ">
            <Link
              className="flex flex-col gap-1"
              key={post.slug}
              href={`${mainNavConfig.hrefs.blog.post}${slug}`}
              aria-label={`Leia mais: "${title}"`}
            >
              <div>
                <h2 className="text-sm font-semibold leading-5">{title}</h2>
                <TagsLink tags={tags} className="text-xs" />
              </div>
              <p className="text-xs  hidden  group-hover:inline-block">{description}</p>
            </Link>
          </CommandItem>
        )
      })}
    </CommandGroup>
  )
}
