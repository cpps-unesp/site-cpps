# CPPS - Centro de Pesquisa Política e Social

<p align="center">
  <img src="public/imagens/logos/cpps/logo-cpps-01_rev_1.png" alt="Logo CPPS" width="300"/>
</p>

Site institucional do Centro de Pesquisa Política e Social da Faculdade de Ciências Humanas e Sociais (FCHS) da Universidade Estadual Paulista (UNESP), campus Franca.

## Tecnologias

- **[Astro](https://astro.build/)** - Framework web moderno para sites rápidos
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** + **[DaisyUI](https://daisyui.com/)** - Estilização e componentes UI
- **[MDX](https://mdxjs.com/)** - Markdown com componentes
- **[Pagefind](https://pagefind.app/)** - Busca estática no site

## Pré-requisitos

- Node.js 18+
- npm
- Git com chave SSH configurada no GitHub ([guia oficial](https://docs.github.com/pt/authentication/connecting-to-github-with-ssh))

## Início rápido

```bash
# Clone o repositório via SSH (recomendado)
git clone git@github.com:cpps-unesp/site-cpps.git
# ou via HTTPS
# git clone https://github.com/cpps-unesp/site-cpps.git
cd site-cpps

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento local
npm run dev
```

O site estará disponível em `http://localhost:4321`

## Estrutura do Projeto

```
site-cpps/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── content/         # Conteúdo em MDX
│   │   ├── membros/     # Perfis dos membros da equipe
│   │   ├── noticias/    # Posts de notícias
│   │   ├── publicacoes/ # Publicações acadêmicas
│   │   └── atividades/  # Wiki e material didático
│   ├── i18n/           # Internacionalização
│   │   ├── locales/    # Arquivos de tradução (pt.json, en.json, es.json)
│   │   └── routes.ts   # Rotas traduzidas
│   ├── layouts/        # Layouts base
│   ├── pages/          # Páginas do site
│   │   └── [lang]/     # Páginas por idioma
│   ├── styles/         # Estilos globais
│   └── utils/          # Funções utilitárias
├── public/             # Assets estáticos
│   ├── imagens/        # Imagens do site
│   └── scripts/        # Scripts do cliente
├── astro.config.mjs    # Configuração do Astro
├── src/styles/global.css # Configuração do Tailwind + DaisyUI
└── package.json
```

## Internacionalização

O site suporta 3 idiomas:

- Português (pt)
- Inglês (en)
- Espanhol (es)



Nessa seção você encontra guias para notícias, publicações, membros da equipe e traduções.

## Temas

O site suporta temas claro e escuro, com detecção automática do sistema. Os temas são configurados em `src/styles/global.css` usando DaisyUI.

## Busca

A busca é implementada com Pagefind e indexa automaticamente todo o conteúdo do site durante o build.

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento

# Build
npm run typecheck     # Verificação de tipos (Astro + TS)
npm run build         # Build de produção
npm run preview       # Preview do build
npm run ci            # Typecheck + build (pipeline local)
```

## Deploy

### Build para produção

```bash
npm run build
```

Os arquivos estáticos serão gerados em `./dist/`

### Configurações importantes

- O projeto usa `output: 'server'` com `@astrojs/cloudflare` para execução no runtime do Cloudflare.
- Atualize a URL base em `astro.config.mjs`
- Configure o sitemap em `pages/sitemap.xml.ts`
- Ajuste as meta tags em `layouts/BaseLayout.astro`

## Licença

Este projeto está sob a licença [MIT](LICENSE).

## Contato

Centro de Pesquisa Política e Social - UNESP Franca

- Website: [cpps.franca.unesp.br](https://cpps.franca.unesp.br)
- Email: cpps@franca.unesp.br
