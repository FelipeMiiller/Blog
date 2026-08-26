# Blog Next.js com Notion

Um blog moderno construído com Next.js e integrado com a API do Notion para gerenciamento de conteúdo.

## Tecnologias Utilizadas

- Next.js 16 com App Router e Turbopack
- React 19
- TypeScript
- Tailwind CSS para estilização
- API do Notion para gerenciamento de conteúdo
- Radix UI para componentes de interface acessíveis
- Lucide React para ícones
- next-themes para suporte a modo escuro
- Vercel para hospedagem e deploy

## Características

- Design responsivo e moderno
- Modo escuro/claro

- Integração com Notion para criação e gerenciamento de posts
- Otimização de SEO
- Categorização e tags para posts
- Pesquisa de conteúdo

## Requisitos

- Node.js 20.9 ou superior
- Yarn 1.x
- Credenciais de uma integração do Notion para carregar os artigos

## Como Usar

```bash
# Clone o repositório
git clone https://github.com/FelipeMiiller/Blog.git

# Entre no diretório
cd Blog

# Instale as dependências
yarn install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
yarn dev
```

Acesse `http://localhost:3000` no seu navegador para ver o blog em ação. O Next.js 16 usa Turbopack por padrão no desenvolvimento e no build. Sem as credenciais do Notion, a aplicação inicia normalmente e exibe os estados vazios; nenhuma chamada inválida é feita à API.

## Verificações locais

```bash
yarn typecheck
yarn lint
yarn test:ci
yarn build
```

## Configuração do Notion

1. Crie uma nova página no Notion para seu blog
2. Configure a integração do Notion e obtenha a chave da API
3. Adicione a chave da API e o ID da página à sua configuração .env.local

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
