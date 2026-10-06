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
- **[EmDash](https://emdashcms.com/)** - CMS do conteúdo editável, com a busca do site

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

## Conteúdo editável (EmDash)

O conteúdo abaixo é editado no [EmDash](https://emdashcms.com), em `/_emdash/admin`, e as páginas são renderizadas a cada acesso: o que é publicado no admin aparece no site sem novo build.

| No admin | Página do site |
|---|---|
| Notícias | Notícias (lista, categorias e notícia) |
| Institucional > Páginas | Título e texto de abertura da Home, Equipe, Documentos, Café com Ciência e Projetos de Pesquisa |
| Institucional > Sobre | Blocos da página Sobre |
| Institucional > Equipe | Pessoas da página Equipe |
| Institucional > Documentos | Documentos |
| Iniciativas > Café com Ciência | Episódios |
| Iniciativas > Projetos de Pesquisa | Projetos |

Cada item tem versões em pt, en e es (painel **Translations** no admin). Sem tradução, o site mostra a versão em português. Nome, foto, links e outros dados que não dependem do idioma são compartilhados entre as versões.

Continuam no repositório: os textos de interface em `src/i18n/locales/*.json`, as demais páginas de Iniciativas, a wiki e os guias em `src/content/`, e as páginas pessoais em `src/content/membros/`.

Para rodar localmente:

```bash
npm install
npx emdash secrets generate --write .env   # uma vez; o .env não vai para o Git
npm run dev
```

Abra `http://localhost:4321/_emdash/admin` (use `localhost`, não `127.0.0.1`: passkeys não funcionam em endereço IP) e conclua o assistente escolhendo **Sample content**, que importa o conteúdo atual de `seed/seed.json`. Depois crie sua conta e registre uma passkey. O banco (D1) e as imagens (R2) locais são simulados pelo Wrangler em `.wrangler/`; apague essa pasta para começar do zero.

## Internacionalização

O site suporta 3 idiomas:

- Português (pt)
- Inglês (en)
- Espanhol (es)



Nessa seção você encontra guias para notícias, publicações, membros da equipe e traduções.

## Temas

O site suporta temas claro e escuro, com detecção automática do sistema. Os temas são configurados em `src/styles/global.css` usando DaisyUI.

## Busca

A busca usa o índice do EmDash (`/_emdash/api/search`): encontra notícias, equipe, Sobre, documentos, episódios do Café com Ciência e projetos assim que são publicados, no idioma da página e, sem tradução, em português. O modal fica em `src/components/SearchModal.astro`. As páginas que não vêm do EmDash (demais Iniciativas, wiki) não entram na busca.

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

## Atualização de dependências

O Dependabot abre um PR por dependência toda semana ([.github/dependabot.yml](.github/dependabot.yml)):

- **Patch e minor de npm**, inclusive correções de segurança de dependências indiretas, entram sozinhos quando o check `ci` passa ([dependabot-auto-merge.yml](.github/workflows/dependabot-auto-merge.yml)).
- **Precisam de revisão humana:** majors, minors de pacotes 0.x (como `sharp`, em que o minor quebra compatibilidade) e atualizações de GitHub Actions.
- Versões incompatíveis conhecidas ficam em `ignore`, com o motivo comentado.
- O auto-merge depende do check `ci` obrigatório no ruleset da `main`. Sem ele, o workflow falha em vez de aprovar.

## Deploy

### Build para produção

```bash
npm run build
```

Os arquivos estáticos são gerados em `./dist/client/` e o Worker em `./dist/server/`. Para testar o build localmente no runtime da Cloudflare: `npx wrangler dev`.

### Configurações importantes

- O site roda inteiro na Cloudflare: um Worker (`wrangler.jsonc`, `src/worker.ts`) com D1 para o banco do EmDash e R2 para as imagens. Primeiro deploy, deploys automáticos e `public/_redirects`: [docs/deploy-e-redirects.md](docs/deploy-e-redirects.md).
- Atualize a URL base em `astro.config.mjs`
- Configure o sitemap em `pages/sitemap.xml.ts`
- Ajuste as meta tags em `layouts/BaseLayout.astro`

## Licença

Este projeto está sob a licença [MIT](LICENSE).

## Contato

Centro de Pesquisa Política e Social - UNESP Franca

- Website: [cpps.franca.unesp.br](https://cpps.franca.unesp.br)
- Email: cpps@franca.unesp.br
