# Blog Next.js com Notion

Um blog moderno construído com Next.js e integrado com a API do Notion para gerenciamento de conteúdo.

## Tecnologias Utilizadas

- Next.js 13 com App Router
- React 18
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
- Sistema de autenticação robusto
- Integração com Notion para criação e gerenciamento de posts
- Otimização de SEO
- Comentários em posts
- Categorização e tags para posts
- Pesquisa de conteúdo

## Como Usar

```bash
# Clone o repositório
git clone https://github.com/FelipeMiiller/Blog.git

# Entre no diretório
cd Blog

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env.local

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000` no seu navegador para ver o blog em ação.

## Configuração do Notion

1. Crie uma nova página no Notion para seu blog
2. Configure a integração do Notion e obtenha a chave da API
3. Adicione a chave da API e o ID da página à sua configuração .env.local

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).