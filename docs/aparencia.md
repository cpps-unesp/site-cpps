# Aparência editável

A identidade visual e parte do layout saem do EmDash, para cada site (o CPPS e os dos grupos) mudar o visual pelo painel ou pelo MCP, sem mexer no código. O código fica em `src/utils/aparencia.ts`.

## O que dá para mudar

No painel, **Aparência › site** (um único item, com slug `site`):

| Campo | Efeito |
|---|---|
| Nome curto | Texto ao lado do logo no cabeçalho |
| Nome completo | Rodapé |
| Logo | Cabeçalho e abertura da página inicial. A variante escura da imagem aparece no tema escuro |
| Mostrar os logos da UNESP | Logos à direita do cabeçalho |
| Cor primária, secundária, de destaque | Botões, links e destaques, nos temas claro e escuro |
| Cor do rodapé | Fundo do rodapé; o texto fica branco ou escuro, o que tiver mais contraste |
| Fonte do texto, fonte dos títulos | Só fontes da lista (Google Fonts) |
| Títulos em maiúsculas | Liga ou desliga a caixa alta dos títulos |
| Cabeçalho | `claro` (fundo do tema) ou `colorido` (fundo na cor primária) |
| Abertura da página inicial | `lateral` (imagem à direita) ou `centralizado` (imagem de fundo, texto no centro) |
| Seções da página inicial | Ordem e presença da abertura (`hero`) e das notícias recentes (`noticias`) |
| Texto do rodapé, redes sociais | Rodapé |

O **menu do topo** é o menu `principal` do EmDash (Menus no painel, ou as ferramentas `menu_*` do MCP), com itens e subitens por idioma. Sem esse menu no banco, o site mostra o menu padrão do CPPS.

## Proteções

- Cor só no formato `#rrggbb`; outro valor cai para a cor padrão.
- Botões e fundos usam a cor escolhida, com o texto em branco ou quase preto, o que der mais contraste. Onde a cor vira texto sobre o fundo (links, destaques), ela precisa de pelo menos 3:1 de contraste com o fundo daquele tema; abaixo disso o texto usa a cor padrão (por exemplo, um vinho escuro continua nos botões, mas os links no tema escuro ficam no azul do CPPS).
- Fontes só da lista: o nome entra no CSS e na URL do Google Fonts.
- Links do menu e das redes só do próprio site (`/…`), `https://` ou `mailto:`. Um `javascript:` vira link vazio.
- Não há campo de CSS livre: estrutura das páginas e componentes novos continuam no código, via PR.
- As páginas pré-renderizadas (404 e 500) não leem o banco e ficam com o visual padrão.

## Colocar no banco de um site que já está no ar

O seed só vale para um banco novo. Num banco que já existe (a produção do CPPS desde 09/10/2026), a coleção e o menu precisam ser criados uma vez. Até lá o site continua com o visual padrão, então o deploy deste código pode vir antes.

1. Anote o ponto de restauração: `npx wrangler d1 time-travel info cpps-site`.
2. Crie a coleção `aparencia` com os campos do `seed/seed.json` (mesmos slugs, tipos e opções). O caminho mais curto é pelo MCP do site (ver [mcp-e-skills.md](mcp-e-skills.md)), com um administrador conectado: peça ao assistente para criar a coleção e os campos exatamente como no seed, com `schema_create_collection` e `schema_create_field`. Pela CLI: `npx emdash schema create` e `npx emdash schema add-field`, como no guia [Evolving a Deployed Site](https://docs.emdashcms.com/deployment/schema-evolution/).
3. No painel, crie o item `site` em Aparência com os valores do seed e publique.
4. Opcional: em Menus, crie o menu `principal` em pt, en e es com os itens do seed. Enquanto ele não existir, vale o menu padrão.
5. Confira a página inicial nos temas claro e escuro.

Nos sites novos, criados do zero a partir deste repositório, o seed já traz a coleção, o item e o menu.
