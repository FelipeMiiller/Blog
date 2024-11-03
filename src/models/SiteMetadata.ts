import { Metadata } from "next"

export type siteMetadataType = {
  metadata: Metadata
  language: string
  theme: string
  links: Record<string, string>
}
