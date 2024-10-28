import React from "react"
import ReactMarkdown from "react-markdown"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css"

interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const HeadingComponent = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
    const Component = ({ node, ...props }: any) => {
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
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm]}
      rehypePlugins={[rehypeKatex]}
      className="font-baskervville"
      components={{
        h1: HeadingComponent(1),
        h2: HeadingComponent(2),
        h3: HeadingComponent(3),
        h4: HeadingComponent(4),
        h5: HeadingComponent(5),
        h6: HeadingComponent(6),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}

export default MarkdownContent
