/** @type {import('next').NextConfig} */

// A série de artigos do RAG ganhou prefixo numérico no título ("1-", "2-", ...)
// para marcar a ordem de aprendizado. Como o slug vem da coluna `URL` do Notion,
// o número entra na URL. Os quatro primeiros já estavam no ar sem ele, então
// estes redirects mantêm os endereços antigos funcionando.
const ANTIGOS_COM_NUMERO = [
  [
    "rag-na-prática-as-sete-peças-entre-a-sua-pergunta-e-a-resposta",
    "1-rag-na-prática-as-sete-peças-entre-a-sua-pergunta-e-a-resposta",
  ],
  ["chunking-como-cortar-um-documento-sem-perder-a-resposta", "2-chunking-como-cortar-um-documento-sem-perder-a-resposta"],
  [
    "embeddings-e-bancos-vetoriais-o-que-cada-motor-realmente-faz",
    "3-embeddings-e-bancos-vetoriais-o-que-cada-motor-realmente-faz",
  ],
  [
    "busca-híbrida-quando-o-vetorial-puro-erra-e-o-léxico-salva",
    "4-busca-híbrida-quando-o-vetorial-puro-erra-e-o-léxico-salva",
  ],
]

const nextConfig = {
  // Padrão do Next: 60 s por página pré-construída. O `notion-to-md` percorre o
  // post inteiro em blocos e, quando o Notion devolve 429, o SDK espera com
  // backoff. Alguns posts passam de 60 s — e aí o problema se multiplica: o
  // Next descarta a página e a reconstrói do zero, o que dispara TODAS as
  // requisições ao Notion de novo e afunda ainda mais o rate limit. Foi assim
  // que dois deploys falharam sem mudança de código. Com 300 s a página
  // lenta termina de uma vez, e a rajada de 429 que ela mesma provoca
  // simplesmente não acontece.
  staticPageGenerationTimeout: 300,
  experimental: {
    // Cada página pré-construída dispara uma sequência de requisições ao Notion
    // via `notion-to-md` (o conteúdo é paginado em blocos). Sem este teto, o
    // build abre um worker por CPU — 14 nesta máquina — e várias páginas batem
    // no Notion ao mesmo tempo. Duas workers mantêm algum paralelismo sem
    // estourar o rate limit.
    cpus: 2,
  },
  async redirects() {
    return ANTIGOS_COM_NUMERO.map(([antigo, novo]) => ({
      // `source` e `destination` vão percent-encoded de propósito. O Next casa
      // o redirect contra o caminho COMO ELE CHEGA na requisição, e o que
      // chega é o texto percent-encoded — é assim que o próprio site monta o
      // canonical e o sitemap (`encodeURIComponent`). Escrever o acento cru
      // compila, aparece no `routes-manifest.json`, e simplesmente nunca
      // casa: o pedido com acento cru ainda leva 400 do Node, antes do Next.
      source: `/blog/post/${encodeURI(antigo)}`,
      destination: `/blog/post/${encodeURI(novo)}`,
      permanent: true,
    }))
  },
}

module.exports = nextConfig