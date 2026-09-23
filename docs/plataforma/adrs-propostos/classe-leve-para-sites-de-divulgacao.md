---
title: "ADR-046 — Classe leve de governança para sites de divulgação, fora do guia do parque"
description: "O guia do parque e o inventário de aplicações não representam um site na Cloudflare. Sites de divulgação ganham classe própria — dono nomeado, portão de merge, segredo fora do git, runbook de saída, check externo, termo de entrada e cópia do conteúdo — e o resto é dispensado."
sidebar:
  order: 49
medido: "2026-09-22"
medidoCom: "leitura de .github/scripts/guarda-apps.py:17 e do schema Zod de website/src/data/inventario/aplicacoes.yaml no colabhd/devops (14 fichas, sitio_dono no enum franca|sp); gh api repos/cpps-unesp/site-cpps/rulesets (Protect main ativo: PR, 1 aprovação, non_fast_forward, check ci); gh api orgs/{colabhd,lab-ippri-unesp,cpps-unesp}/repos (site-gedai, site-lantri e site-nefa com size 0 desde 11/06/2026; site-odr privado); leitura de .github/workflows/ci.yml do site-redalint; tamanho da mídia do site-cpps (141 MB em 281 arquivos) — lido em 2026-09-22"
---

## Status

**Proposto** — 2026-09-22. Aguarda revisão de Rafael e Arthur.

## Contexto

A frente de sites vai pôr **dezenas** de sites de grupos de pesquisa no ar, em três
organizações do GitHub — `colabhd`, `lab-ippri-unesp` e `cpps-unesp` — publicados na
Cloudflare Pages, sem um único pod no parque. **Qual governança se aplica a eles?**

A resposta default seria o [guia do parque](/frentes/aplicacoes-servicos/novo-app/) — etapas
0 a 7, portões, aplicação nascendo sem sync automático, promoção com prova e saída
explícita. O guia não está em questão: **ele não alcança esta classe de coisa**, e isso é
verificável, não opinião:

- **A guarda de CI não enxerga.** `.github/scripts/guarda-apps.py:17` indexa apenas
  `apps/franca`, `apps/sp` e `apps/multi`. Site sem manifesto no cluster não tem diretório
  ali, então não há o que casar.
- **O schema não representa.** A ficha em `website/src/data/inventario/aplicacoes.yaml` é
  validada por Zod **strict**, com `sitio_dono` restrito ao enum `franca|sp`. Um site na
  Cloudflare não é nenhum dos dois: a ficha não fica incompleta, é **irrepresentável**, e o
  `strict` rejeita o campo extra que tentasse consertar.
- **O precedente já existe.** As 14 fichas do inventário **não incluem** `devops.colabh.org`
  nem `trilhas.colabh.org`. A casa já publica fora do parque sem ficha de aplicação, e nunca
  registrou por quê — este ADR vira a prática em critério.

Forçar o guia dá fichas mentirosas (`sitio_dono: franca` para algo que roda na borda da
Cloudflare) ou dezenas de exceções manuais numa guarda que não foi feita para tê-las.

:::note
Este ADR decide **governança**, não hospedagem nem stack. N repositórios (um por site),
TinaCMS self-hospedado e Cloudflare Pages vêm de outros ADRs desta série e entram aqui como
**restrições dadas**.
:::

## Decisão

**Criar uma classe própria — "site de divulgação" — com sete obrigações e o resto
dispensado.**

### O que PERMANECE obrigatório

Nenhuma delas vem do guia do parque, e todas ficam **mais** importantes numa classe leve,
porque não há etapa 0-a-7 para pegar o erro depois.
1. **Dono humano nomeado.** Uma pessoa do grupo, com nome e e-mail, no registro — não "o
   CPPS", não "a equipe". A equipe central são **duas pessoas** (Rafael e Arthur) para
   dezenas de sites; sem dono do lado do grupo, cada dúvida de conteúdo vira fila nessas
   duas pessoas.
2. **Portão de merge.** `main` não recebe push direto nem merge com CI vermelha. Detalhe na
   seção *Ruleset por classe*.
3. **Segredo fora do git.** Mesmo regime da casa: SOPS + age (`.sops.yaml`) e `gitleaks`. O
   risco é maior que no parque porque **o repositório é público**: token da Cloudflare
   vazado num repo privado é incidente; num público é incidente com janela de segundos.
4. **Runbook de saída escrito ANTES do primeiro grupo entrar.** O guia do parque tem "saída
   explícita" na etapa 7; aqui ela é **pré-requisito da etapa 1**, porque a razão declarada
   para N repositórios é que sair seja transferir o repositório — e uma razão de desenho
   nunca testada é hipótese.
5. **Check externo de 200 na raiz**, por hostname do `sites.yaml`. É o blackbox que o
   [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/) põe entre as quatro peças de
   infra própria, e roda no parque, fora do objeto vigiado. Entra aqui como obrigação da
   classe porque é barato — um `GET` por hostname — e porque a falha que ele pega é
   exatamente a que esta classe, sem ficha e sem dashboard, não pegaria de outro jeito. É o
   caso do `nefits.franca.unesp.br`, que aponta para conta inexistente e ninguém viu.
6. **Termo de entrada assinado pelo grupo**, com três propriedades que o arranjo tem e que
   surpreendem quem não leu ADR nenhum: (a) **o rascunho é público no instante do save** —
   `IsomorphicBridge.put()` commita por arquivo gravado, e não há embargo possível; (b) **a
   edição visual não acompanha a saída** — o repositório é do grupo, o CMS não; (c) **a mídia
   em R2 não acompanha a transferência do repositório**, e sai por cópia. Data de aceite e
   quem assinou pelo grupo entram no `sites.yaml`. Sem isso, o grupo descobre as três no pior
   momento possível.
7. **Cópia do conteúdo.** Hoje a frota inteira existe em **uma cópia só**: repositórios no
   GitHub, em três orgs no plano Free, com o CMS commitando por save e um token `Pages:Edit`
   de conta replicado em três lugares. A casa tem ADR-018 (PBS) e ADR-028 (backup de PVC)
   para o parque, e nada equivalente aqui. A decisão: **espelho periódico para o parque** —
   `git clone --mirror` de cada repositório do `sites.yaml` e sincronização do bucket R2, num
   volume que o PBS já cobre. Semanal basta: o conteúdo muda por commit, e o histórico do git
   é o próprio versionamento. **Não medido:** o tamanho total da frota espelhada; hoje só há
   os 141 MB de mídia do `site-cpps` como referência.

### O que se DISPENSA

Ficha em `aplicacoes.yaml` e a guarda `guarda-apps.py`; as etapas 0 a 7 com portões e promoção
com prova; **alerta com destinatário, dashboard e SLO por site** — o que fica é o check da
obrigação 5, que detecta; agir sobre o que ele detecta não tem plantão; e a **revisão de dado
de pesquisa**, já que a classe o exclui por definição.

**Dado de pesquisa não é dado pessoal, e a dispensa não alcança o segundo.** Estes sites
publicam nome, cargo, foto, contribuição e redes sociais de pessoas — a collection `membros` e
as 71 instâncias localizadas da seção de equipe medidas no
[ADR-045](/decisoes/i18n-field-based-com-fallback/). Isso é tratamento de dado pessoal num
sítio de universidade pública, e a LGPD não usa a distinção acima. O mínimo que a classe
obriga:

- **Base legal declarada uma vez, para todos os sites**: publicação de informação institucional
  sobre integrantes de grupo de pesquisa, com **consentimento registrado pelo dono do grupo** no
  momento em que a pessoa entra na página de equipe.
- **Remoção a pedido**: a pessoa pede ao dono do grupo, que remove o arquivo e abre o PR. Em
  repositório público, **o histórico continua lá** — remover de verdade é reescrita de
  histórico, e isso precisa ser dito no termo de entrada, não descoberto depois.
- **Sem analytics no kit.** Nenhum site nasce com Google Analytics, pixel ou cookie de terceiro.
  Quem quiser medir audiência usa as estatísticas agregadas da Cloudflare, que não põem cookie
  no visitante. Assim a classe não precisa de banner de consentimento — e banner de consentimento
  em dezenas de sites, com duas pessoas, seria dívida garantida.
- **Não verificado:** se a UNESP tem política própria de privacidade a que estes sites devam
  aderir, e se há encarregado (DPO) a informar. Verificaria antes do primeiro site fora do CPPS.

### O que se perde ao dispensar — o argumento contra esta decisão

O guia existe porque **o inventário é o que impede a casa de esquecer que uma coisa
existe**. Dispensá-lo custa três coisas, sem mitigação completa:

- **Um site cai e ninguém é acordado.** O check da obrigação 5 detecta, mas não há alerta com
  destinatário nem plantão: entre detectar e alguém agir pode passar um fim de semana. É menos
  do que se tinha em mente ao dispensar o guia, e mais do que existe hoje —
  `nefits.franca.unesp.br` aponta para `labriunesp.github.io`, **conta do GitHub que não
  existe**, e ninguém viu.
- **Duas listas divergem.** Quem procurar "todos os hostnames da casa" precisa de dois arquivos, e um deles fica velho.
- **A fronteira vaza.** Um site "só de divulgação" ganha um formulário, depois um login, depois
  um dado pessoal, e a classe leve não tem portão que perceba; o critério 1 tenta virar isso
  gatilho observável, mas depende de alguém abrir um PR honesto.

Aceita-se porque a alternativa é pior: 30 fichas com `sitio_dono` falso destroem a
confiabilidade do inventário inteiro, inclusive das 14 certas.

### O registro próprio: `sites.yaml`

Arquivo novo, schema Zod próprio, **sem** herança do `aplicacoes.yaml`. Mora em
**`colabhd/devops`**, ao lado de `aplicacoes.yaml`, e é a **fonte única da frota**: é dele que
saem a lista de origens do `postMessage` do admin
([ADR-043](/decisoes/edicao-visual-cross-origin/)), a lista de alvos do check externo, a classe
de ruleset que o script `gh` aplica e a lista do espelho da obrigação 7. Nenhum outro inventário
de sites é criado em lugar nenhum — o argumento contra estender o `aplicacoes.yaml` ("duas listas
divergem") vale contra qualquer segunda lista, inclusive uma nossa. Campos mínimos:

| campo | por quê |
|---|---|
| `slug` | chave estável; casa com o nome do repositório (`site-<slug>`) |
| `nome` | nome do grupo por extenso, para a página de listagem |
| `org` | `colabhd` \| `lab-ippri-unesp` \| `cpps-unesp` — segredo, App e workflow **não cruzam org** |
| `repo` | URL completa; é o objeto que se transfere na saída |
| `hostname` | o que responde 200; um só, canônico. **É entrada de confiança do admin** — dele sai a allowlist de `postMessage` do CMS ([ADR-043](/decisoes/edicao-visual-cross-origin/)), então o consumidor valida o formato (host de zona da casa, sem esquema, sem `@`, sem barra) e recusa a linha que não passar |
| `zona` | zona autoritativa na Cloudflare, ou `unesp` quando o domínio é da universidade e exige chamado |
| `dono` | nome + e-mail de **uma pessoa** do grupo |
| `responsavel_tecnico` | Rafael ou Arthur; quem responde quando o build quebra |
| `projeto_pages` | nome do projeto na Cloudflare Pages |
| `modo_deploy` | `git` \| `direct-upload` — **registro de estado herdado**, não escolha: site novo nasce `direct-upload` pelo [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/), e o campo existe para marcar o que já está do outro lado, já que a escolha é irreversível por projeto |
| `classe_ruleset` | `site-de-grupo` \| `plataforma` — é o que o script `gh` lê para saber qual perfil aplicar |
| `status` | `provisionando` \| `no-ar` \| `em-saida` \| `arquivado` |
| `data_no_ar` | data em que a raiz devolveu 200 pela primeira vez |
| `termo_entrada` | data de aceite e quem assinou pelo grupo (obrigação 6) |

**Por que não estender o `aplicacoes.yaml`:** estender é relaxar o `strict` ou alargar o enum
`sitio_dono`. Relaxar o `strict` enfraquece a validação das 14 fichas existentes em troca de
campos que só a classe nova usa; alargar o enum faz `sitio_dono` deixar de significar "em que
sítio isto roda", que é a razão de `guarda-apps.py` conseguir cruzar ficha com diretório.
Schema separado custa um arquivo; schema alargado custa a semântica do campo central.

### Repositório público como requisito da classe

**Razão do grupo:** são sites de divulgação — texto institucional, notícias, equipe. **Não
guardam dado de pesquisa.** Se um precisar guardar, sai da classe e volta ao guia do parque; as
restrições vigentes de 19/09/2026 já dizem que aplicação com dado sensível espera.

**Razão técnica, e é a que fecha a questão:** no plano **Free** do GitHub, repositório
**privado não aceita ruleset nem branch protection** — a API devolve 403. Num repositório
privado desta classe **o portão de merge não existe**, e ele é uma das sete obrigações
mantidas. Público não é estética: é a única configuração em que a obrigação 2 é executável
sem plano pago. De quebra, Actions em repositório público é grátis e sem cota, enquanto
privado consome os 2.000 min/mês **por organização**, que não cruzam entre as três.

:::caution[Caso pendente: `lab-ippri-unesp/site-odr` é privado hoje]
Colide com o requisito. Três saídas, em ordem de preferência: (a) revisar o histórico com
`gitleaks` e tornar público, se o conteúdo for de divulgação; (b) mantê-lo privado e **fora
desta classe**, aceitando que não tem portão de merge no plano Free; (c) tratá-lo como
aplicação, no guia do parque. **Não foi verificado** o que ele contém nem por que nasceu
privado — decidir exige olhar o repositório, e este ADR não olhou.
:::

### Ruleset por classe, e a assimetria

Ruleset é **por repositório**; não há herança de organização a aplicar aqui, logo é
configuração replicada, e replicá-la em dezenas de repos custa.

| classe | regras |
|---|---|
| **site de grupo** | check `ci` obrigatório + `non_fast_forward`. **Sem** exigência de aprovação humana. |
| **repositório de plataforma** (kit de componentes, backend do CMS, templates) | PR + **1 aprovação** + check `ci` + `non_fast_forward`. |

**Em qual branch o CMS escreve:** `main`. É o que faz o save publicar, e é o que torna a
assimetria abaixo necessária.

**Por que a assimetria.** No site de grupo quem publica é o CMS, em nome de um editor: o
`IsomorphicBridge.put()` do Tina commita por arquivo gravado. Se `main` exigir aprovação
humana, **o CMS não publica** — cada correção de vírgula vira um PR esperando uma das duas
pessoas da equipe central, e a aprovação não revisa nada, só enfileira. O que protege o site
é o check `ci` e o `non_fast_forward`, e ambos rodam sem humano. No repositório de
plataforma inverte: um commit no kit atinge **todos** os sites de uma vez, e ali a aprovação
é a única coisa entre um erro e dezenas de páginas quebradas.

:::caution[`cpps-unesp/site-cpps` está hoje do lado errado desta regra]
O repositório tem ruleset **ativo** `Protect main`: PR + **1 aprovação** +
`non_fast_forward` + check `ci`. Pela decisão acima um site de grupo não deve exigir
aprovação — e enquanto exigir, **o CMS não publica sozinho**. Nota lateral: o `AGENTS.md` do
repositório afirma o contrário e **está errado**; a correção do texto é independente da
decisão sobre a regra.
:::

### Provisionamento: pronto é 200 na raiz

**Um site novo só conta como provisionado quando uma requisição HTTP à raiz do hostname
canônico devolve 200** — não quando o repositório é criado, nem quando o projeto da Pages
existe, nem quando o DNS propaga. Até lá o `status` é `provisionando`, fora de listagem.

O anti-padrão está medido na casa: **`gedai`, `lantri` e `nefa`**, criados em **11/06/2026**,
continuam com **`size` 0** — três meses e meio de repositório que existe por qualquer critério
de "existe" e não serve por nenhum de "serve". Regra que decorre: **não criar repositório
antes de haver conteúdo e data de publicação acordados com o grupo**.

### Saída de um grupo: o runbook

Escrito antes do primeiro grupo entrar, cobrindo três coisas que saem por caminhos distintos:

- **Repositório.** Transferência de propriedade no GitHub para a conta ou org do grupo — a
  razão declarada de N repositórios em vez de monorepo, e que precisa ser **ensaiada** uma vez
  antes de valer como promessa. O ruleset acompanha; os segredos **não**, e devem ser
  rotacionados, porque segredo de organização não cruza org.
- **Domínio.** Em zona autoritativa nossa na Cloudflare (`colabh.org`, `cppsunesp.org`,
  `labriunesp.org`, `lab-ippriunesp.org`), é remover o registro e o grupo apontar o dele. Se o
  hostname é da UNESP — o caso de `cpps.franca.unesp.br`, **fora** das nossas zonas — depende
  de **chamado na UNESP**, com prazo que não controlamos; o runbook diz isso antes, não
  depois.
- **Conteúdo e mídia.** O conteúdo sai no próprio repositório (MDX no git); a **mídia não
  necessariamente** — em R2 é um bucket que não acompanha a transferência, e a do
  `site-cpps` são **141 MB em 281 arquivos**. **Não foi verificado** se transferir um projeto
  da Cloudflare Pages entre contas é possível sem recriá-lo; se não for, a saída inclui "o
  grupo recria o projeto" e a indisponibilidade entra no runbook.

## Alternativas rejeitadas

**Aplicar o guia `novo-app` a cada site.** A favor, e é forte: **uma** governança em vez de
duas, já conhecida pela casa; toda coisa publicada com ficha, dono e observabilidade pelo
mesmo caminho, e a listagem do que a casa publica num arquivo só. Rejeitada porque não é
executável como está — `guarda-apps.py:17` indexa três diretórios que o site não tem, e o
schema strict não aceita a ficha. Torná-la executável é a terceira alternativa abaixo.

**Nenhuma governança.** A favor: a equipe central são **duas pessoas** para dezenas de sites,
toda regra é trabalho recorrente, o risco é baixo e a Pages faz rollback por deploy. Rejeitada
por quatro coisas já medidas neste parque de repositórios: `site-redalint` **não tem ruleset**
e o `ci.yml` dele usa `push` com `branches-ignore: main`, ou seja **nunca roda na main**; três
repositórios vazios desde 11/06; um hostname apontando para conta inexistente; e `site-cpps` e
`site-redalint` já divergindo na mesma stack (`astro-pagefind` 1.8 vs 2.0, `theme-change` 2.5
vs 3.0, `@astrojs/mdx` 5 vs 6), em deploys diferentes. A deriva já aconteceu com **dois**
sites; com dezenas, é o padrão.

**O CMS escrever numa branch de conteúdo, com PR automático.** É a alternativa mais óbvia ao
conflito entre aprovação humana e publicação pelo CMS, e o argumento a favor é forte: o Tina
commita na branch que lhe for configurada, então o save abriria PR em vez de publicar, a `main`
manteria a exigência de aprovação como todos os outros repositórios da casa, um site
institucional voltaria a ter revisão humana do que publica, e o **rollback** ficaria mais barato
— basta não mergear. Rejeitada por uma razão só, e ela é de vazão: com dezenas de sites, cada
correção de vírgula vira um PR esperando uma das **duas** pessoas da equipe central, que é
precisamente o gargalo que "edição visual agora" existe para remover; e a aprovação dada em
massa, sem leitura, é pior que aprovação nenhuma, porque cria registro de revisão que não houve.
O que a substitui é o conjunto obrigação 5 (detecção) + rollback por deploy do ADR-041. **Se o
dono do grupo quiser revisão**, ela volta para aquele site por configuração do Tina — a decisão
é do grupo, registrada no `sites.yaml`, não um padrão da classe.

**Estender o inventário existente** (`sitio_dono: cloudflare`, ou um campo `tipo: site`). A
favor, e é bom: uma fonte de verdade só, e a listagem de hostnames continua sendo um `grep`
num arquivo. Rejeitada porque o custo cai sobre o que já funciona — alargar o enum tira de
`sitio_dono` o significado que `guarda-apps.py` usa para cruzar ficha com diretório, e
relaxar o `strict` enfraquece a validação das 14 fichas certas. Ver o critério 5.

## Consequências

**Aceita-se duas fontes de verdade** sobre o que a casa publica: `aplicacoes.yaml` para o
parque, `sites.yaml` para a divulgação. É o custo direto da rejeição acima, e só é tolerável
enquanto os conjuntos não se sobrepuserem — no dia em que um site precisar de pod, a dívida
vence. **Aceita-se que a queda de um site seja detectada e não escalada**: o check da obrigação
5 registra, mas não há alerta com destinatário, SLO nem plantão — o tempo entre detectar e
consertar não tem alvo.

**Aceita-se replicar ruleset repositório a repositório, em três organizações.** Ruleset é por
repositório e não tem herança; aplicar à mão em dezenas de repos é erro esperado, e a automação
— o script `gh` idempotente do [ADR-040](/decisoes/plataforma-sites-n-repositorios/), lendo
`classe_ruleset` no `sites.yaml` — é trabalho que este ADR cria e não executa. **O workflow, ao
contrário do ruleset, não se replica**: reutilizável em repositório público de `colabhd`, ele é
chamado por `uses:` pelas três orgs. O que não é herdado é workflow no repositório `.github` de
uma organização — que no `colabhd` contém apenas o `sync-readme` —, e confundir as duas coisas
criaria trabalho de replicação que o mecanismo não exige.

**Muda o `site-cpps` agora:** remover a exigência de 1 aprovação do ruleset `Protect main`,
mantendo `ci` e `non_fast_forward`. **Bloqueia `lab-ippri-unesp/site-odr`** de entrar na classe
enquanto for privado, porque nesse estado ele não pode ter portão de merge no plano Free.

**A correção do `AGENTS.md` do `site-cpps` é item deste ADR, com dono e prazo** — cinco ADRs
desta série a mencionam de passagem e nenhum a assume, que é como uma correção de uma linha
sobrevive meses. Dono: **Rafael**; prazo: no mesmo PR que remove a exigência de aprovação do
ruleset. E a lição geral, que é maior que o arquivo: **documentação de repositório não é fonte
sobre configuração**. O mesmo script `gh` que aplica o ruleset publica o estado real lido da
API, num arquivo gerado — quem quiser saber se a `main` está protegida lê a saída do script, não
um `.md` escrito à mão.

**O rollback de publicação não é decidido aqui:** com a aprovação removida, o que protege o site
de um conteúdo errado no ar é o procedimento do
[ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/) — promoção do deploy anterior na
Pages, mais `git revert`. Quem executa é o `responsavel_tecnico` do `sites.yaml`.

**Cria uma obrigação datada:** o runbook de saída existe e foi ensaiado **antes** do primeiro
grupo externo entrar; se não, "sair é transferir o repositório" vira folclore. **Não força
migração retroativa**: `devops.colabh.org` e `trilhas.colabh.org` seguem como estão, e esta
decisão rege o **próximo** site.

## Critério de revisão

1. **Um site desta classe passar a receber dado de pessoa** — formulário, login, lista de
   e-mails: sai da classe no mesmo PR e volta ao guia do parque.
2. **A conta da Cloudflare passar de 70 projetos na Pages** — mesmo número dos critérios de
   revisão do [ADR-040](/decisoes/plataforma-sites-n-repositorios/) e do
   [ADR-041](/decisoes/sites-na-cloudflare-pages-direct-upload/), para que os três reabram
   juntos e não em três momentos diferentes. O teto é 100 por conta, e a doc diz que não é
   rotineiramente aumentado.
3. **A primeira saída de grupo levar mais de 5 dias úteis** entre o pedido e o site respondendo
   200 no domínio do grupo: a premissa de N repositórios é que sair seja barato, e se não for,
   vários ADRs desta série reabrem juntos.
4. **O GitHub aceitar ruleset em repositório privado no plano Free**, ou a casa passar a plano
   pago em alguma das três orgs: o requisito de repositório público perde a metade técnica e
   fica só com a razão do grupo.
5. **Um hostname aparecer nos dois arquivos** (`sites.yaml` e `aplicacoes.yaml`): a fronteira
   vazou e a dívida de duas listas venceu.
6. **O check da obrigação 5 registrar uma queda e ninguém agir em 24 h**, duas vezes em 12
   meses → a detecção existe e a resposta não; entra alerta com destinatário nomeado, que é a
   primeira coisa que esta classe dispensou.
7. **Um espelho semanal da obrigação 7 falhar duas semanas seguidas**, ou a restauração de um
   repositório a partir do espelho nunca ter sido ensaiada 12 meses depois de a classe existir
   → a cópia é hipótese, e o GitHub voltou a ser cópia única sem ninguém ter decidido isso.

## A verificar

- O que há em `lab-ippri-unesp/site-odr` e por que nasceu privado.
- Se transferir projeto da Cloudflare Pages entre contas existe sem recriá-lo.
- Se **ruleset de organização** para repositórios públicos existe no plano Free nas três orgs.
  **Não verificado**; se existir, a replicação por repo fica barata e a 3ª consequência muda.
- Se `gedai`, `lantri` e `nefa` devem ser arquivados ou provisionados.
