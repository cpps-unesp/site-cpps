# MCP e skills de agente

Como editar o conteúdo do site por um assistente de IA (Claude, Cursor, Copilot...) e como dar ao assistente as instruções do EmDash quando ele mexe no código.

## MCP: editar o conteúdo por um assistente

O EmDash já vem com um servidor MCP ligado (opção `mcp` da integração, `true` por padrão; o `astro.config.mjs` não a desliga). Ele fica em:

| Ambiente | Endereço do MCP |
|---|---|
| Produção, até a migração | `https://cpps-site.cpps-franca.workers.dev/_emdash/api/mcp` |
| Produção, depois da migração | `https://cpps.franca.unesp.br/_emdash/api/mcp` |
| Teste | `https://cpps-site-teste.cpps-franca.workers.dev/_emdash/api/mcp` |
| Local (`npm run dev`) | `http://localhost:4321/_emdash/api/mcp` |

O endpoint só responde a quem está autenticado, e cada pessoa age com o papel que tem no admin: um Contributor continua só criando rascunhos, mesmo pelo assistente. As ferramentas cobrem conteúdo (listar, ler, criar, editar, publicar), mídia, busca, taxonomias, menus e o modelo de conteúdo.

### Conectar

Há dois jeitos de entrar, e os dois valem para o endereço em que a pessoa tem conta:

- **OAuth (recomendado).** O site publica a descoberta OAuth (`/.well-known/oauth-protected-resource`) e aceita registro dinâmico de cliente, então basta informar o endereço do MCP. O cliente abre o admin no navegador, a pessoa entra com a passkey e autoriza.
  - **Claude Code:** este repositório já traz o `.mcp.json` com o servidor `cpps-site` da produção. Ao abrir o projeto, aprove o servidor e rode `/mcp` para fazer o login. Para outro endereço: `claude mcp add --transport http cpps-site-teste https://cpps-site-teste.cpps-franca.workers.dev/_emdash/api/mcp`.
  - **Claude (app e claude.ai):** Configurações → Conectores → Adicionar conector personalizado, com o endereço do MCP.
  - **Outros clientes:** qualquer um que aceite MCP por HTTP (Streamable HTTP) com OAuth.
- **Token de API.** Para clientes sem OAuth ou para automação: no admin, Configurações → API Tokens, crie um token com os escopos necessários e configure o cliente com o cabeçalho `Authorization: Bearer <token>`. Trate o token como uma senha: não o ponha em arquivo do repositório.

Com o domínio novo (passo 3 da [migração](deploy-e-redirects.md#migração-para-o-domínio)), troque o endereço no `.mcp.json` e reconecte os clientes.

### Cuidados

- O MCP grava direto no banco de produção, como o admin. Peça ao assistente para criar como **rascunho** e confira no admin antes de publicar.
- Em edições em lote (muitas notícias, a equipe inteira), anote antes o ponto de restauração do banco: `npx wrangler d1 time-travel info cpps-site`.
- Mudar o modelo de conteúdo pelo MCP (criar coleção ou campo) altera só aquele banco; para valer nos outros ambientes e nos sites novos, leve a mudança para o `seed/seed.json` (ver [Evolving a Deployed Site](https://docs.emdashcms.com/deployment/schema-evolution/)).
- Para desligar o MCP, `mcp: false` na integração `emdash()` do `astro.config.mjs`.

## Skills de agente: mexer no código

As [skills oficiais do EmDash](https://github.com/emdash-cms/skills) (licença MIT) ensinam o assistente a trabalhar com o EmDash: modelo de conteúdo e seed, consultas e Portable Text, CLI, plugins e atualização de versão.

- **Claude Code:** o `.claude/settings.json` deste repositório registra o marketplace `emdash-cms/skills` e ativa o plugin `emdash`. Ao abrir o projeto, o Claude Code pede para confiar no marketplace e instala o plugin; as skills aparecem como `emdash:building-emdash-site`, `emdash:emdash-cli`, `emdash:upgrading-emdash` e `emdash:creating-plugins`. Para pegar versões novas: `/plugin marketplace update emdash`.
- **Outros assistentes:** `npx skills add emdash-cms/skills` instala para Cursor, Copilot, Codex, Gemini CLI e outros. Não faça commit do `.agents/` nem do `skills-lock.json` que ele gera: o `.claude/settings.json` já cobre o Claude Code, e as skills copiadas para o repositório envelhecem.
- O `npx upgrade-emdash@latest` (ver [Atualizar o EmDash](deploy-e-redirects.md#atualizar-o-emdash)) também roda esse instalador. Descarte o que ele gerar em `.agents/`, `.claude/skills/` e `skills-lock.json`.

As instruções específicas deste site continuam no `AGENTS.md`.
