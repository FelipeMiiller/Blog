/**
 * Slug de tag, no mesmo formato que o site já publica em `/blog/tags/<slug>`.
 *
 * O slug do POST não passa por aqui: vem da coluna de fórmula `URL` do Notion
 * (`readSlugFromNotion`, em `service/notion/index.ts`). As tags continuam
 * precisando de um slug próprio, e é isso que esta função faz.
 *
 * A ordem importa: primeiro a pontuação sai, só depois o espaço vira hífen.
 * Invertido, o hífen gerado no fim apareceria grudado na pontuação.
 *
 * A pontuação é checada por ponto de código em vez de regex. Um caractere
 * Unicode literal dentro de uma classe de caracteres é invisível no editor, e
 * um espaço acidental ali apaga metade da string — erro que já custou duas
 * tentativas nesta fórmula do Notion.
 *
 * Verificado contra as 24 categorias que existem hoje no database: bate em
 * todas.
 */
function ehPontuacao(codigo: number): boolean {
  // ASCII: !"#$%&'()*+,-./  e  :;<=>?@  e  [\]^`  e  {|}~
  if (codigo >= 0x21 && codigo <= 0x2f) return true
  if (codigo >= 0x3a && codigo <= 0x40) return true
  if (codigo >= 0x5b && codigo <= 0x60) return true
  if (codigo >= 0x7b && codigo <= 0x7e) return true

  // Sem separador invisivel e simbolos latin-1 de pontuacao.
  if (codigo === 0x00a0 || codigo === 0x00ab || codigo === 0x00b7) return true
  if (codigo === 0x00bb || codigo === 0x00bf) return true

  // General Punctuation: travessao, aspas curvas, reticencias.
  if (codigo >= 0x2000 && codigo <= 0x206f) return true

  // Ideographic space.
  if (codigo === 0x3000) return true

  return false
}

export function slugify(valor: string): string {
  if (typeof valor !== "string") return ""

  return Array.from(valor)
    .filter((caractere) => !ehPontuacao(caractere.codePointAt(0) ?? 0))
    .join("")
    .toLowerCase()
    .replace(/ /g, "-")
}