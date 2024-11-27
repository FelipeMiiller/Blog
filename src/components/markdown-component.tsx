import ReactMarkdown, { Options } from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css"

import React from "react"
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

export interface MarkdownProps extends Readonly<Options>, VariantProps<typeof markdownContentVariants> {
  content: string | null | undefined
}

export function MarkdownContent({ content, variant, size, className }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkEmoji, remarkMath]}
      rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeKatex]}
      className={markdownContentVariants({ variant, size, className })}
      components={{
        h1: HeadingComponent(1),
        h2: HeadingComponent(2),
        h3: HeadingComponent(3),
        h4: HeadingComponent(4),
        h5: HeadingComponent(5),
        h6: HeadingComponent(6),
        code: ({ inline, className, children, ...props }: any) => {
          const match = /language-(\w+)/.exec(className || "")
          const language = match ? match[1] : ""

          return !inline && match ? (
            <SyntaxHighlighter style={dracula} language={language} className="rounded-md" {...props}>
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code className={className}>{children}</code>
          )
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
