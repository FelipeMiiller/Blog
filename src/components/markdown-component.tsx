import React, { JSX } from "react"
import ReactMarkdown, { ExtraProps, Options } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css"

import { cva, VariantProps } from "class-variance-authority"

const HeadingComponent = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const Component = ({ ...props }: any) => {
    const extractText = (children: React.ReactNode): string => {
      return React.Children.toArray(children)
        .map((child) => {
          if (typeof child === "string") return child
          if (React.isValidElement(child) && child.props.children) {
            return extractText(child.props.children)
          }
          return ""
        })
        .join("")
    }

    const text = extractText(props.children)
    const id = text.toLowerCase().replace(/[^\w]+/g, "-")
    return React.createElement(`h${level}`, { id, ...props }, props.children)
  }
  Component.displayName = `Heading${level}`
  return Component
}

const markdownContentVariants = cva("font-poppins space-y-2 flex-grow ", {
  variants: {
    variant: {
      default: "prose dark:prose-invert",
    },
    size: {
      default: "max-w-3xl",
    },
    img: {
      default: "prose-img:space-y-0 prose-img:p-0 prose-img:my-0",
    },
    p: {
      default:
        "prose-p:flex prose-p:flex-wrap prose-p:space-y-0 prose-p:space-x-0.5 prose-p:p-0 prose-p:my-0 prose-p:h-min",
    },
    h: {
      default: "prose-h:space-y-0 prose-h:p-0",
    },
    a: {
      default: "prose-a:space-y-0 prose-a:p-0 prose-a:my-0",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    img: "default",
    p: "default",
    h: "default",
  },
})

type Components = Partial<{
  [TagName in keyof JSX.IntrinsicElements]:  // eslint-disable-next-line no-unused-vars
    | (new (props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.ElementClass)
    // eslint-disable-next-line no-unused-vars
    | ((props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.Element | string | null | undefined)
    // Tag name:
    | keyof JSX.IntrinsicElements
}>

export interface MarkdownProps extends Readonly<Options>, VariantProps<typeof markdownContentVariants> {
  content: string | null | undefined
}

const components: Components = {
  h1: HeadingComponent(1),
  h2: HeadingComponent(2),
  h3: HeadingComponent(3),
  h4: HeadingComponent(4),
  h5: HeadingComponent(5),
  h6: HeadingComponent(6),
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || "")
    return !inline && match ? (
      <SyntaxHighlighter style={...vscDarkPlus} language={match[1]} PreTag="div" {...props}>
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    )
  },
}

export function MarkdownContent({ content, variant, size, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
      className={markdownContentVariants({ variant, size, className })}
      components={{
        ...components,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
