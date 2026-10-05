/** @type {import('next').NextConfig} */

// O artigo 01 entrou no ar com um título encurtado ("...o mapa da linha de
// aprendizado...") e depois passou a usar o H1 do markdown, que é a fonte
// editorial. O site deriva o slug do título que está no Notion, então a URL
// mudou. O redirect mantém o endereço antigo funcionando.
const SLUG_ANTIGO = "rag-na-prática-o-mapa-da-linha-de-aprendizado-e-as-sete-peças"
const SLUG_NOVO = "rag-na-prática-as-sete-peças-entre-a-sua-pergunta-e-a-resposta"

const nextConfig = {
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
