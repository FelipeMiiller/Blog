"use client"

import { useTheme } from "next-themes"
import * as React from "react"

interface MermaidProps {
  chart: string
}

/**
 * Renderiza um diagrama mermaid.
 *
 * Sem este componente, o fence ```mermaid cai no SyntaxHighlighter e o leitor vê
 * o texto do diagrama. Aqui ele é desenhado, e acompanha o tema do site
 * (next-themes, atributo `class` no <html>).
 *
 * Decisões que importam:
 * - `import("mermaid")` dinâmico: o mermaid pesa ~1MB e não deve entrar no bundle
 *   inicial de todo post que não tem diagrama.
 * - `securityLevel: "strict"`: o mermaid sanitiza os rótulos antes de gerar o SVG,
 *   e é isso que torna seguro o `dangerouslySetInnerHTML` abaixo.
 * - Falha de render não pode derrubar a página: o diagrama vira um bloco de
 *   código legível, que ainda é melhor que nada.
 * - `fontFamily` sem `var()`: o mermaid mede o texto para calcular o tamanho do
 *   SVG, e `var(--fonte)` não resolve durante a medição.
 * - Sem flag de "montado": `useEffect` não roda no servidor, então o placeholder
 *   já é idêntico no HTML do servidor e no primeiro render do cliente. Um
 *   `setState` dentro de effect para marcar montagem dispara
 *   `react-hooks/set-state-in-effect` e não compra nada.
 * - O id do render leva um contador: `mermaid.render` falha com "already exists"
 *   se o id anterior não foi removido do DOM, e o id precisa ser estável entre
 *   renders do React mas único entre renders do mermaid.
 */
export function Mermaid({ chart }: MermaidProps) {
  const { resolvedTheme } = useTheme()
  const [svg, setSvg] = React.useState<string | null>(null)
  const [erro, setErro] = React.useState<string | null>(null)

  const idBase = React.useId().replace(/[^a-zA-Z0-9]/g, "")
  const renderAtual = React.useRef(0)

  React.useEffect(() => {
    let cancelado = false

    async function desenhar() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: resolvedTheme === "dark" ? "dark" : "default",
          fontFamily: "Poppins, ui-sans-serif, system-ui, sans-serif",
        })
        const id = `mmd-${idBase}-${renderAtual.current++}`
        const resultado = await mermaid.render(id, chart)
        if (!cancelado) {
          setSvg(resultado.svg)
          setErro(null)
        }
      } catch (falha) {
        if (!cancelado) {
          setSvg(null)
          setErro(falha instanceof Error ? falha.message : String(falha))
        }
      }
    }

    desenhar()
    return () => {
      cancelado = true
    }
  }, [chart, resolvedTheme, idBase])

  if (!svg && !erro) {
    return <div className="my-2 min-h-24 w-full rounded-md bg-zinc-100/60 dark:bg-zinc-900/40" />
  }

  if (erro) {
    return (
      <details className="my-2 w-full">
        <summary className="cursor-pointer text-sm text-zinc-500 dark:text-zinc-400">
          Não foi possível desenhar o diagrama (ver código)
        </summary>
        <pre className="mt-2 overflow-x-auto rounded-md bg-zinc-100 p-3 text-sm dark:bg-zinc-900">
          <code>{chart}</code>
        </pre>
      </details>
    )
  }

  return (
    <div
      className="my-2 flex w-full justify-center overflow-x-auto [&_svg]:h-auto [&_svg]:max-w-full"
      dangerouslySetInnerHTML={{ __html: svg ?? "" }}
    />
  )
}
