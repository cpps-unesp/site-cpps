# Onde estes arquivos entram

Os oito ADRs desta pasta são escritos para o repositório **`colabhd/devops`**, na pasta

```
website/src/content/docs/decisoes/
```

que é a collection do Starlight de onde sai `https://devops.colabh.org/decisoes/<slug>/`.
Copiar o arquivo `.md` para lá, sem renomear: o **slug da URL é o nome do arquivo**, e todas as
referências cruzadas entre os oito já estão escritas no formato absoluto `/decisoes/<slug>/`,
que é o que os ADRs existentes usam (`gpu-sharing.md`, `dominios-por-natureza.md`,
`conector-mcp-oauth-authentik.md`). Nenhum link relativo `../` foi usado.

## Estado: todos são propostas

Os oito estão com

```
## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.
```

Nada aqui foi ratificado, nada foi implementado, e o bloco não deve ser mudado para `Aceito`
antes de a revisão acontecer. As medições que sustentam o texto estão no `medido:` /
`medidoCom:` do frontmatter de cada arquivo, todas de **2026-09-22**.

## Numeração e `sidebar.order`

Verificado por `gh api` em 22/09/2026: a pasta tem 39 ADRs, de **ADR-001 a ADR-039, sem
buracos**, e o maior é `afq-desligado-antes-da-fase-5.md`. O **próximo número livre é o 040** —
a tabela do `index.md` não serve de fonte, porque para no 038 e ainda pula de 031 para 038.

O `sidebar.order` da casa **não é igual ao número do ADR**: há um deslocamento de +3 desde o
ADR-033 (033→36, 034→37, 035→38, 036→39, 037→40, 038→41, 039→42). O maior `order` em uso é
**42**, então esta leva ocupa **43 a 50**:

| arquivo | ADR | `sidebar.order` |
|---|---|---|
| `plataforma-sites-n-repositorios.md` | 040 | 43 |
| `sites-na-cloudflare-pages-direct-upload.md` | 041 | 44 |
| `tinacms-self-hospedado-central.md` | 042 | 45 |
| `edicao-visual-cross-origin.md` | 043 | 46 |
| `identidade-visual-por-grupo-tokens.md` | 044 | 47 |
| `i18n-field-based-com-fallback.md` | 045 | 48 |
| `classe-leve-para-sites-de-divulgacao.md` | 046 | 49 |
| `agente-de-traducao-local-cliente-do-endpoint.md` | 047 | 50 |

Antes do merge, conferir que nada mudou na pasta:

```sh
grep -h '^  order:' website/src/content/docs/decisoes/*.md | sort -t: -k2 -n | tail -5
```

## Linhas a acrescentar na tabela do `index.md`

A tabela de `website/src/content/docs/decisoes/index.md` lista 001 a 031 e depois salta para
038. Faltam **032 a 037 e 039**, que existem como arquivo. Entrando mais oito sem atualizar, a
tabela passaria a omitir 14 ADRs — deixaria de ser índice. As linhas abaixo fecham os dois
buracos, no formato exato da tabela existente.

### Os sete que faltam hoje (inserir em ordem, antes da linha do 038)

```markdown
| [032](./conector-mcp-oauth-authentik/) | Conector MCP do Huly: OAuth pelo Authentik com fachada de registro, e o segredo do Huly no pod | Aceito — 2026-09-16 |
| [033](./como-um-cliente-interno-alcanca-um-servico/) | Dentro do sítio, o nome do `Service`; entre sítios, o mesh — e IP literal em env deixa de passar | Proposta — 2026-09-09 |
| [034](./registro-de-enderecamento-vigiado/) | O registro de endereçamento é vigiado contra a realidade, não derivado dela | Proposta — 2026-09-09 |
| [035](./degrau-bgp-adiado/) | O degrau para BGP é adiado, e os gatilhos são reescritos a partir do medido | Proposta — 2026-09-09, recomendação de adiar |
| [036](./ha-do-proxmox-nos-dois-sitios/) | O dado sobrevive ao nó e o serviço não: o HA do Proxmox liga em SP, e Franca fica de fora com o RTO escrito | Proposta — 2026-09-09 |
| [037](./politica-de-quorum-drbd/) | O comportamento na perda de quorum vira decisão declarada — `suspend-io` ou terceira réplica diskful | Proposta — 2026-09-09 |
```

E, depois da linha do 038:

```markdown
| [039](./afq-desligado-antes-da-fase-5/) | O `afq-franca` é desligado antes da fase 5, e não renumerado | Aceito — 2026-09-10; desligamento sem prazo, gatilho armado para 2026-10-31 |
```

### Os oito desta leva (acrescentar ao fim)

```markdown
| [040](./plataforma-sites-n-repositorios/) | Topologia da plataforma de sites: um repositório por site, em três organizações, com chassi em pacote npm | Proposto — 2026-09-22 |
| [041](./sites-na-cloudflare-pages-direct-upload/) | Sites de grupo na Cloudflare Pages por Direct Upload, e nenhum deles no K3s | Proposto — 2026-09-22 |
| [042](./tinacms-self-hospedado-central/) | TinaCMS self-hospedado central desde o início, um serviço para todos os sites | Proposto — 2026-09-22 |
| [043](./edicao-visual-cross-origin/) | Edição visual com admin central e sites em domínios próprios | Proposto — 2026-09-22 |
| [044](./identidade-visual-por-grupo-tokens/) | Identidade visual própria por grupo, por tokens versionados, sem fork de código | Proposto — 2026-09-22 |
| [045](./i18n-field-based-com-fallback/) | Modelo multilíngue dos sites: field-based no CMS, com resolvedor único e fallback explícito | Proposto — 2026-09-22 |
| [046](./classe-leve-para-sites-de-divulgacao/) | Classe leve de governança para sites de divulgação, fora do guia do parque | Proposto — 2026-09-22 |
| [047](./agente-de-traducao-local-cliente-do-endpoint/) | Agente de IA local para tradução e estilo: cliente HTTP do endpoint do parque, com o determinístico primeiro | Proposto — 2026-09-22 |
```

## O que a leva decide, em uma linha cada

- **040** — a topologia: N repositórios, em qual org nasce cada site, escopo do kit, donos das
  três organizações e o que o plano Free não deixa auditar.
- **041** — a hospedagem: Direct Upload na Cloudflare Pages, **uma** conta, a lista fechada das
  quatro peças de infra própria, o rollback de publicação e o CNAME pendurado do `nefits`.
- **042** — o CMS: contêiner self-hospedado em `cms.colabh.org`, sete peças sem scaffold, ciclo
  de vida do editor e o que o admin **não** edita na primeira fase.
- **043** — a edição visual cross-origin, e a **sanitização do rich-text**, que não tem outro
  dono na série.
- **044** — identidade por tokens, catálogo fechado e o gate de contraste (regra e limiar).
- **045** — i18n field-based com fallback, e as três peças de i18n que são do kit.
- **046** — a classe leve de governança, com **sete** obrigações, o `sites.yaml` como fonte
  única da frota, LGPD e a correção datada do `AGENTS.md`.
- **047** — o agente de tradução como cliente HTTP, o determinístico primeiro, e os dois
  defeitos do PR #540 com dono.

## Antes de abrir o PR

1. Conferir `grep -c '' *.md` e os `order:` (acima).
2. Rodar `npm run build` do `website/` do `devops` — o Starlight falha em link interno
   quebrado, e é o teste real das referências cruzadas.
3. Acrescentar as **15 linhas** de tabela acima ao `index.md`, no mesmo PR.
4. Não mudar o bloco `## Status` de nenhum dos oito.
