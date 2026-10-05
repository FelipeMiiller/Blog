/** @type {import('next').NextConfig} */

// O artigo 01 entrou no ar com um título encurtado ("...o mapa da linha de
// aprendizado...") e depois passou a usar o H1 do markdown, que é a fonte
// editorial. O site deriva o slug do título que está no Notion, então a URL
// mudou. O redirect mantém o endereço antigo funcionando.
const SLUG_ANTIGO = "rag-na-prática-o-mapa-da-linha-de-aprendizado-e-as-sete-peças"
const SLUG_NOVO = "rag-na-prática-as-sete-peças-entre-a-sua-pergunta-e-a-resposta"

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
    return [
      {
        // `source` e `destination` vão percent-encoded de propósito. O Next casa
        // o redirect contra o caminho COMO ELE CHEGA na requisição, e o que
        // chega é o texto percent-encoded — é assim que o próprio site monta o
        // canonical e o sitemap (`encodeURIComponent`). Escrever o acento cru
        // compila, aparece no `routes-manifest.json`, e simplesmente nunca
        // casa: o pedido com acento cru ainda leva 400 do Node, antes do Next.
        source: `/blog/post/${encodeURI(SLUG_ANTIGO)}`,
        destination: `/blog/post/${encodeURI(SLUG_NOVO)}`,
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
