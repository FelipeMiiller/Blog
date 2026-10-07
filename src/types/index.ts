import React from "react"
import { Metadata, Viewport } from "next"

export interface Tag {
  id: string
  name: string
  color: string
  slug: string
}

/**
 * Série a que o post pertence, lida da coluna `Serie` do Notion.
 *
 * `select` de propósito: um post entra em no máximo uma série. É o que separa
 * "sou o capítulo 4 de um percurso" de "tenho as tags RAG e Busca".
 */
export interface Serie {
  id: string
  name: string
  color: string
}

export type Post = {
  slug: string
  page: string
  title: string
  created: string
  updated?: string
  description: string
  authors: {
    object: string
    id: string
    name: string
    avatar_url: string
    type: string
    person: { email: string }
  }[]
  tags: Tag[]
  serie?: Serie | null
}

export interface TagCount {
  name: string
  count: number
  slug: string
}

export type NavItem = {
  title: string
  href: string
  icon?: React.ReactNode
  disabled?: boolean
  external?: boolean
}

export type MainNavType = {
  mainNav: NavItem[]
}

export type siteMetadataType = {
  metadata: Metadata
  language: string
  social: Record<string, string>
  theme: string
  links: Record<string, string>
  viewport: Viewport
}

export interface SearchParamsProps {
  searchParams?: {
    page?: string
    query?: string
  }
}

export type ResponseData<T> = {
  message?: string
  status: number
  data?: T | null
}
