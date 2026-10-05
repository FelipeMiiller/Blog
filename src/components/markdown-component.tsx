import ReactMarkdown, { type Options } from "react-markdown"
import { Prism as SyntaxHighlighter, type SyntaxHighlighterProps } from "react-syntax-highlighter"
import dracula from "react-syntax-highlighter/dist/cjs/styles/prism/dracula"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import rehypeSanitize from "rehype-sanitize"
import remarkEmoji from "remark-emoji"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

import "katex/dist/katex.min.css"

import React from "react"
import { cva, VariantProps } from "class-variance-authority"

import { Mermaid } from "./mermaid"

const CodeHighlighter = SyntaxHighlighter as unknown as React.ComponentType<SyntaxHighlighterProps>

type HeadingProps = React.ComponentProps<"h1">

type CodeProps = Omit<React.ComponentProps<"code">, "style"> & { inline?: boolean }

const HeadingComponent = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const Component = (props: HeadingProps) => {
    const extractText = (children: React.ReactNode): string => {
      return React.Children.toArray(children)
        .map((child) => {
          if (typeof child === "string") return child
          if (React.isValidElement<{ children?: React.ReactNode }>(child) && child.props.children) {
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
      default: "prose-p:space-y-0 prose-p:p-0 prose-p:my-0",
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
        pre: ({ node, children }) => {
          // O Tailwind Typography dá a todo `pre` um fundo cinza-escuro fixo
          // (#1f2937, igual nos dois temas) com texto claro — escolha proposital
          // para bloco de código. Para um diagrama é o oposto do certo: o SVG sai
          // com as cores do tema claro sobre um retângulo escuro.
          //
          // O react-markdown sempre envolve o `code` de bloco em um `pre`, então
          // trocar só o renderer do `code` não resolve: o `pre` continua atrás.
          //
          // A decisão vem do NÓ do markdown (`node.children[0].properties
          // .className`), não de comparar `element.type === Mermaid`. Comparar
          // identidade de componente depende de as duas pontas importarem a MESMA
          // instância do módulo, e isso não é uma garantia que o bundler faz — o
          // `pre` continuava aparecendo e o diagrama continuava sobre o fundo
          // escuro. Ler o fence é o que não depende de nada.
          const filho = node?.children?.[0]
          const ehDiagrama =
            filho?.type === "element" &&
            filho.tagName === "code" &&
            /\blanguage-mermaid\b/.test(String(filho.properties?.className ?? ""))

          if (ehDiagrama) {
            return <>{children}</>
          }
          return <pre>{children}</pre>
        },
        code: ({ inline, className, children, ...props }: CodeProps) => {
          const match = /language-(\w+)/.exec(className || "")
          const language = match ? match[1] : ""
          const codigo = String(children).replace(/\n$/, "")

          // Diagrama vai para o renderer do mermaid; o resto vai para o Prism.
          if (!inline && language === "mermaid") {
            return <Mermaid chart={codigo} />
          }

          return !inline && match ? (
            <CodeHighlighter style={dracula} language={language} className="rounded-md" {...props}>
              {codigo}
            </CodeHighlighter>
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
