# CPPS - Centro de Pesquisa Política e Social

<p align="center">
  <img src="public/imagens/logos/cpps/logo-cpps-01_rev_1.png" alt="Logo CPPS" width="300"/>
</p>

Site institucional do Centro de Pesquisa Política e Social da Faculdade de Ciências Humanas e Sociais (FCHS) da Universidade Estadual Paulista (UNESP), campus Franca.

## 🚀 Tecnologias

- **[Astro](https://astro.build/)** - Framework web moderno para sites rápidos
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript com tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** + **[DaisyUI](https://daisyui.com/)** - Estilização e componentes UI
- **[MDX](https://mdxjs.com/)** - Markdown com componentes
- **[Pagefind](https://pagefind.app/)** - Busca estática no site

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## ⚡ Início rápido

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/cpps-unesp.git
cd cpps-unesp

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento local
npm run dev
```

O site estará disponível em `http://localhost:4321`

### Simulação Cloudflare (opcional)

Para simular o runtime de Pages Functions localmente:

```bash
npm run build
npx wrangler pages dev
```

Use esse fluxo apenas quando precisar validar comportamento específico de Cloudflare. Para desenvolvimento diário, prefira `npm run dev`.

## 📁 Estrutura do Projeto

```
cpps-unesp/
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── content/         # Conteúdo em MDX
│   │   ├── membros/     # Perfis dos membros da equipe
│   │   ├── noticias/    # Posts de notícias
│   │   └── docs/        # Documentação
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

## 🌐 Internacionalização

O site suporta 3 idiomas:

- Português (pt)
- Inglês (en)
- Espanhol (es)

## ✍️ Editar site

A documentacao editorial foi centralizada em:

- `/pt/editar-site`
- `/en/editar-site`
- `/es/editar-site`

Nessa secao voce encontra guias para noticias, publicacoes, membros da equipe e traducoes.

## 🎨 Temas

O site suporta temas claro e escuro, com detecção automática do sistema. Os temas são configurados em `src/styles/global.css` usando DaisyUI.

## 🔍 Busca

A busca é implementada com Pagefind e indexa automaticamente todo o conteúdo do site durante o build.

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento

# Build
npm run typecheck     # Verificação de tipos (Astro + TS)
npm run build         # Build de produção
npm run preview       # Preview do build
npm run ci            # Typecheck + build (pipeline local)
```

## 🛠️ Troubleshooting

### `The Workers runtime failed to start`

- Se esse erro aparecer no `wrangler pages dev`, continue o desenvolvimento com `npm run dev`.
- Para testar Cloudflare local, rode `npm run build` antes de `npx wrangler pages dev`.
- Em caso de falhas locais persistentes do Wrangler, use CI/deploy para validar o ambiente Cloudflare.

## 📊 Relatório de 404

O middleware registra eventos 404 em JSON no log do servidor com o campo `event: "http_404"`.

Campos emitidos:

- `timestamp`
- `method`
- `path`
- `query`
- `status`
- `referer`
- `userAgent`
- `lang`
- `requestId`

### Como consultar no Cloudflare

Use o tail do Worker e filtre os eventos:

```bash
npx wrangler tail --format pretty
```

No output, filtre por `http_404` para levantar URLs quebradas e origem (`referer`).

### Recorte recomendado (semanal)

- Top paths 404
- Top referers
- Distribuição por idioma (`lang`)
- Padrões recorrentes para criar redirects/correções

## 🚀 Deploy

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

### Cloudflare KV para sessões (`SESSION`)

Antes do deploy em produção, crie os namespaces KV e atualize `wrangler.jsonc`:

```bash
# namespace de produção
npx wrangler kv namespace create SESSION

# namespace de preview
npx wrangler kv namespace create SESSION --preview
```

Depois, copie os IDs retornados para:

- `kv_namespaces[0].id` em `wrangler.jsonc`
- `kv_namespaces[0].preview_id` em `wrangler.jsonc`

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 📞 Contato

Centro de Pesquisa Política e Social - UNESP Franca

- Website: [cpps.franca.unesp.br](https://cpps.franca.unesp.br)
- Email: cpps@franca.unesp.br

## Agradecimentos

- [@ArthurCarrenho](https://github.com/ArthurCarrenho) - primeira versão do readme e otimizações iniciais (2025)
- [@JuliaSilveira](https://github.com/rikamishiro) - identidade visual (2025)
- [@ligiadlsimplicio](https://github.com/ligiadlsimplicio) - inclusão das informações inciais no site (2025)

---

Desenvolvido com ❤️ pela equipe do CPPS - UNESP Franca
