import { SocialIcon } from "@/components"

type Kind = "mail" | "github" | "youtube" | "linkedin" | "x"
type SocialIconProps = {
  links: Record<Kind, string>
}

export const ListSocial = ({ links }: SocialIconProps) => {
  return (
    <div className="mb-3 flex space-x-4">
      {Object.keys(links).map((key) => {
        return (
          <SocialIcon
            key={key as keyof typeof links}
            kind={key as Kind}
            href={links[key as keyof typeof links]}
            size={6}
          />
        )
      })}
    </div>
  )
}
