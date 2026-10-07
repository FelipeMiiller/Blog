import Link from "next/link"
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

import { envConfigs } from "@/config"

import { Mermaid } from "./mermaid"

const SITE_ORIGIN = envConfigs.site.baseUrl.replace(/\/$/, "")

/**
 * Traduz um link do markdown para um caminho interno, ou `null` se for externo.
 *
 * O corpo do artigo é markdown vindo do Notion, e os links entre os artigos da
 * série estão lá como URL absoluta (`https://www.felipemiiller.com/blog/post/...`).
 * O `next/link` só faz prefetch de rota interna, então a URL absoluta do próprio
 * site precisa virar caminho — é isso que aquece o artigo alvo antes do clique.
 */
function caminhoInterno(href: string): string | null {
  if (href.startsWith("/")) return href
  if (href.startsWith("#") || href.startsWith("mailto:")) return null
  if (!SITE_ORIGIN) return null
  if (href === SITE_ORIGIN) return "/"
  if (href.startsWith(`${SITE_ORIGIN}/`)) return href.slice(SITE_ORIGIN.length)

  return null
}

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
        a: ({ node, href, children, ...props }) => {
          // `node` é o nó hast que o react-markdown entrega junto. Ele não pode
          // virar atributo de DOM; a desestruturação já o tira do `...props`, e
          // a linha abaixo só evita que o lint trate o binding como variable morta.
          void node

          // Sem este renderer o react-markdown emite `<a>` puro e o Next não
          // sabe que o link é rota interna. Num artigo-hub que aponta para os
          // outros da série isso é visível: o visitante passa segundos
          // esperando o conteúdo antes de ver o texto.
          const interno = href ? caminhoInterno(href) : null

          if (interno) {
            // `prefetch` precisa ser explícito. No App Router o padrão é
            // `"auto"`, que em rota DINÂMICA só busca até o trecho mais próximo
            // com `loading.js` — e a rota do post não tem `loading.js`, então o
            // padrão simplesmente não busca a árvore. Com `true` o Next traz o
            // RSC completo de todos os trechos, que é o que dispara a geração
            // sob demanda da página. Sem isso, passar o mouse no link do
            // artigo-hub não aquece nada e o clique paga a espera inteira.
            //
            // Só vale para link que é rota do próprio site; link externo
            // continua sendo `<a>`.
            return (
              <Link href={interno} prefetch={true} {...props}>
                {children}
              </Link>
            )
          }

          return (
            <a href={href} {...props}>
              {children}
            </a>
          )
        },
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
