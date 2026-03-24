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

### GitHub Pages publica sem domínio customizado

- Confirme se `public/CNAME` existe com `cpps.franca.unesp.br`.
- Em **Settings → Pages** do repositório, valide o domínio customizado configurado.
- Verifique o DNS do domínio apontando para GitHub Pages.

### Links canônicos ou sitemap com domínio incorreto

- Confira `site` em `astro.config.mjs`.
- Rode `npm run build` e valide `dist/sitemap.xml`.

## 🚀 Deploy

### GitHub Pages (via GitHub Actions)

```bash
npm run build
```

Os arquivos estáticos serão gerados em `./dist/`

### Configurações importantes

- O projeto usa `output: 'static'` para publicação em GitHub Pages.
- Atualize a URL base em `astro.config.mjs`
- Configure o sitemap em `pages/sitemap.xml.ts`
- Ajuste as meta tags em `layouts/BaseLayout.astro`
- Mantenha `public/CNAME` com o domínio customizado

### Pipeline de publicação

O deploy ocorre automaticamente no push para `main` via workflow:

```bash
/.github/workflows/deploy.yml
```

### Requisitos para domínio customizado

- Repositório de publicação: `site-cpps.github.io`
- `public/CNAME` com `cpps.franca.unesp.br`
- DNS do domínio configurado para GitHub Pages

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
