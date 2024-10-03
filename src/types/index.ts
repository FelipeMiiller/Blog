export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface Post {
  title: string
  created: string
  updated: string
  description: string
  slug: string
  tags: Tag[]
}

export interface TagCount {
  name: string
  count: number
  slug: string
}
