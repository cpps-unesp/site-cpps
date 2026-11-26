# Apoio de IA: MCP e skills

Este guia explica como usar um assistente de IA (Claude, Codex, Cursor, Copilot e outros) para trabalhar com o site: o que dá para fazer, o que configurar uma vez e como pedir as coisas no dia a dia. Ele vale para o site do CPPS e serve de modelo para os sites dos grupos feitos a partir dele (ver [Levar para outro site](#levar-para-outro-site)).

## O que isso possibilita

São três peças, e cada uma resolve um problema diferente:

| Peça | Para quem | O que permite | Precisa de login? |
|---|---|---|---|
| **MCP da documentação** (`emdash-docs`) | Quem mexe no código ou tem dúvida sobre o EmDash | O assistente pesquisa a documentação atual do EmDash antes de responder, em vez de confiar na memória do modelo (que costuma estar desatualizada) | Não |
| **MCP do site** (`cpps-site`) | Quem edita conteúdo | O assistente lê e edita o conteúdo do site no ar: notícias, páginas, equipe, mídia, menus, taxonomias e o próprio modelo de conteúdo | Sim, com a passkey do admin |
| **Skills de agente** (`emdash:*`) | Quem mexe no código | Instruções oficiais do EmDash para o assistente: modelo de conteúdo e seed, consultas, Portable Text, CLI, plugins, atualização de versão e migração de sites WordPress | Não |

Exemplos do que se pode pedir com tudo ligado:

- "Cria um rascunho de notícia sobre o seminário de 12/03 com este texto e esta imagem, em pt, en e es."
- "Lista as pessoas da equipe sem foto" ou "quais notícias de 2024 não têm tradução para o inglês?"
- "Corrige o cargo da Maria na página Equipe" ou "troca a imagem de destaque da notícia X".
- "Acrescenta o item Publicações ao menu principal, depois de Notícias."
- "Como faço uma consulta paginada no EmDash?" ou "o que muda na versão nova do EmDash?" (o assistente consulta a documentação).
- "Adapta este tema/plugin do WordPress para EmDash" (skills de migração, úteis para os próximos sites).

O assistente faz o que a pessoa faria no admin, com o mesmo papel dela. Ele não substitui a conferência humana: veja [Cuidados](#cuidados).

## O que fazer uma vez

### 1. Escolher onde usar

| Onde | MCP da documentação | MCP do site | Skills |
|---|---|---|---|
| **Claude Code no seu computador**, dentro da pasta do repositório | Já vem no `.mcp.json` | Já vem no `.mcp.json` | Já vêm no `.claude/settings.json` |
| **Claude (claude.ai, app de desktop ou celular)** | Adicionar como conector personalizado | Adicionar como conector personalizado | Não se aplica |
| **Codex, Cursor, VS Code e outros** | Configurar no cliente (abaixo) | Configurar no cliente, se ele aceitar MCP por HTTP com OAuth | `npx skills add emdash-cms/skills` |

Sessões do Claude Code na nuvem (claude.ai/code e os threads de projeto) podem não alcançar o endereço `*.workers.dev` do site, por causa da política de rede do ambiente. Nelas o MCP da documentação e as skills funcionam, mas para editar o conteúdo use o Claude Code local, uma máquina da rede da Unesp ou o claude.ai com o conector.

### 2. Claude Code (recomendado para quem mexe no código)

1. Instale o [Claude Code](https://code.claude.com/docs) e abra a pasta do repositório: `cd site-cpps && claude`.
2. Ao abrir, o Claude Code pergunta se confia nos servidores do `.mcp.json` (`emdash-docs` e `cpps-site`) e no marketplace de plugins `emdash-cms/skills`. Aceite os três.
3. Rode `/mcp`, escolha `cpps-site` e faça o login: o navegador abre o admin do site, você entra com a passkey e aprova as permissões. O `emdash-docs` não pede login.
4. Confira com `/mcp` (os dois servidores conectados) e `/plugin` (plugin `emdash` ativo).

Para usar outro ambiente, como o de teste: `claude mcp add --transport http cpps-site-teste https://cpps-site-teste.cpps-franca.workers.dev/_emdash/api/mcp`.

### 3. Claude no navegador ou no app (recomendado para quem só edita conteúdo)

Em **Configurações → Conectores → Adicionar conector personalizado**:

- **Documentação do EmDash:** nome `EmDash docs`, endereço `https://docs.emdashcms.com/mcp`. Adicionado uma vez, vale em qualquer conversa e para todos os sites.
- **Conteúdo do site:** nome `Site CPPS`, endereço do MCP do site (tabela abaixo). Ao conectar, o Claude abre o admin para você entrar com a passkey. Repita para cada site que você edita.

Em planos de organização (Team, Enterprise), pode ser preciso que alguém com papel de dono adicione o conector para a organização.

### 4. Outros assistentes

- **Codex:** `codex mcp add emdash-docs --url https://docs.emdashcms.com/mcp`; skills com `codex plugin add emdash@emdash`.
- **VS Code:** em `.vscode/mcp.json`, `"servers": { "emdash-docs": { "type": "http", "url": "https://docs.emdashcms.com/mcp" } }`.
- **OpenCode:** `"mcp": { "emdash-docs": { "type": "remote", "url": "https://docs.emdashcms.com/mcp" } }`.
- **Qualquer assistente com skills:** `npx skills add emdash-cms/skills`. Não faça commit do `.agents/` nem do `skills-lock.json` que ele gera: as cópias no repositório envelhecem.

## Endereços do MCP do site

| Ambiente | Endereço |
|---|---|
| Produção, até a migração | `https://cpps-site.cpps-franca.workers.dev/_emdash/api/mcp` |
| Produção, depois da migração | `https://cpps.franca.unesp.br/_emdash/api/mcp` |
| Teste | `https://cpps-site-teste.cpps-franca.workers.dev/_emdash/api/mcp` |
| Local (`npm run dev`) | `http://localhost:4321/_emdash/api/mcp` |

O login vale para o endereço em que foi feito. Na troca do domínio (passo 3 da [migração](deploy-e-redirects.md#migração-para-o-domínio)), troque o endereço no `.mcp.json` e nos conectores e entre de novo.

## Como usar no dia a dia

- **Peça em português, como pediria a uma pessoa.** O assistente escolhe as ferramentas. Diga a coleção ("notícia", "página Equipe") e o idioma quando importar.
- **Peça rascunho.** "Cria como rascunho" e depois confira no admin (`/_emdash/admin`) ou pelo botão **Visualização ao vivo** antes de publicar.
- **Para dúvidas técnicas, peça a fonte.** "Consulta a documentação do EmDash e me mostra o link" faz o assistente usar o `emdash-docs`.
- **Em lote, peça antes a lista.** "Me mostra o que você vai mudar" antes de "pode aplicar".
- **Mídia:** mande a imagem na conversa ou um link; o assistente sobe para a biblioteca de mídia e usa no item.

## Cuidados

- **O MCP do site grava direto no banco de produção**, como o admin. Cada pessoa age com o papel que tem: um Contributor continua só criando rascunhos, mesmo pelo assistente.
- **Antes de edições em lote**, anote o ponto de restauração do banco: `npx wrangler d1 time-travel info cpps-site`.
- **Mudar o modelo de conteúdo** (criar coleção ou campo) pelo MCP altera só aquele banco. Para valer nos outros ambientes e nos sites novos, leve a mudança para o `seed/seed.json` (ver [Evolving a Deployed Site](https://docs.emdashcms.com/deployment/schema-evolution/)). No dia a dia, deixe isso para quem cuida do site.
- **Não ponha segredo nem dado pessoal em perguntas à documentação:** elas vão para os servidores do EmDash.
- **Token de API** (para cliente sem OAuth ou automação): no admin, Configurações → API Tokens. Para editar conteúdo bastam `content:read`, `content:write`, `media:read` e `media:write`; deixe `admin`, `schema:write`, `settings:manage` e `transfer:*` para quem cuida do site. O cliente usa o cabeçalho `Authorization: Bearer <token>`. Guarde o token num cofre de senhas, nunca num arquivo do repositório.
- **Para desligar o MCP do site:** `mcp: false` na integração `emdash()` do `astro.config.mjs`.

## Referência: o que vem no repositório

| Arquivo | O que faz |
|---|---|
| `.mcp.json` | Registra os servidores `emdash-docs` e `cpps-site` para o Claude Code |
| `.claude/settings.json` | Registra o marketplace `emdash-cms/skills` e ativa o plugin `emdash` |
| `AGENTS.md` | Regras deste repositório para qualquer assistente (lido também pelo Claude Code, Codex e Cursor) |
| `docs/mcp-e-skills.md` | Este guia |

**MCP da documentação.** Público, só de leitura, uma ferramenta: `search_docs`, que devolve trechos da documentação com o link da fonte. Não lê nem altera o site. Detalhes: [docs.emdashcms.com/docs-mcp](https://docs.emdashcms.com/docs-mcp/).

**MCP do site.** Vem ligado no EmDash (opção `mcp` da integração, `true` por padrão). Publica a descoberta OAuth (`/.well-known/oauth-protected-resource`) e aceita registro dinâmico de cliente, então basta informar o endereço. A sessão do admin no navegador, sozinha, não autentica o MCP. As ferramentas cobrem conteúdo (listar, ler, criar, editar, publicar), mídia, busca, taxonomias, menus e o modelo de conteúdo.

**Skills de agente.** As [skills oficiais do EmDash](https://github.com/emdash-cms/skills) (licença MIT), publicadas a cada versão:

| Skill | Para quê |
|---|---|
| `emdash:building-emdash-site` | Modelo de conteúdo e seed, consultas, Portable Text, menus, taxonomias, deploy |
| `emdash:emdash-cli` | Administrar o site pela linha de comando |
| `emdash:creating-plugins` | Plugins: hooks, rotas, armazenamento, telas do admin |
| `emdash:upgrading-emdash` | Atualizar pacotes, código do projeto e migrações |
| `emdash:wordpress-theme-to-emdash` | Portar um tema WordPress (exige as duas primeiras) |
| `emdash:wordpress-plugin-to-emdash` | Portar o comportamento de um plugin WordPress |

Para pegar versões novas no Claude Code: `/plugin marketplace update emdash`. O `npx upgrade-emdash@latest` (ver [Atualizar o EmDash](deploy-e-redirects.md#atualizar-o-emdash)) também instala skills em `.agents/`, `.claude/skills/` e `skills-lock.json`: descarte esses arquivos.

## Levar para outro site

Todo site de grupo feito a partir deste repositório deve sair com o mesmo apoio de IA. Ao criar o repositório do site novo:

1. Copie `.claude/settings.json` sem mudança.
2. Copie `.mcp.json` e troque o servidor do site: nome (`<grupo>-site`) e endereço (`https://<worker>.workers.dev/_emdash/api/mcp`, depois o domínio). Mantenha o `emdash-docs`.
3. Copie a seção "EmDash: documentação, MCP e skills" do `AGENTS.md` e escreva as regras próprias do site (comandos, coleções, o que não pode entrar no repositório).
4. Copie este guia e troque nomes, endereços e o nome do banco D1.
5. Depois do primeiro deploy, quem cuida do site conecta o MCP uma vez e confere `/mcp`. Os editores do grupo adicionam os conectores no claude.ai (seção 3).

O [TransfoPress](https://github.com/cpps-unesp/site-transfopress) já segue este padrão.
