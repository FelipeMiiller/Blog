import Link from "next/link"

import { ButtonUi } from "../ui"
import { Icons } from "./icons"

const components = {
  mail: Icons.mail,
  github: Icons.gitHub,
  youtube: Icons.youtube,
  linkedin: Icons.linkedin,
  x: Icons.x,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

export const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (!href || (kind === "mail" && !/^mailto:\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(href)))
    return null

  const SocialSvg = components[kind]

  return (
    <Link
      className={ButtonUi.Variants({
        size: "icon",
        variant: "ghost",
      })}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <SocialSvg className={` h-${size} w-${size}`} />
      <span className="sr-only">GitHub</span>
    </Link>
  )
}
