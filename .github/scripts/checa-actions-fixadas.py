#!/usr/bin/env python3
"""Reprova qualquer action que não esteja fixada por SHA de commit.

Fixada por SHA, uma action não pode ser trocada por código hostil depois da
revisão: a tag é móvel, o commit não.

É uma rede de proteção contra tag colada por engano e contra regressão, não
uma barreira contra quem quer burlar. O CI roda a versão deste script que o
próprio PR traz, então um PR pode alterá-lo para sempre passar. E o script
confere só o formato do SHA, não se o commit existe no repositório da action
nem se bate com a tag anotada ao lado. Essas duas coisas continuam sendo
trabalho de quem revisa.

Lê o YAML em vez de procurar texto com regex, porque regex não entende YAML:
flow mapping ({uses: x@v1}), chave entre aspas ("uses": x@v1), valor na linha
seguinte e "uses:" dentro de comentário passam por qualquer grep. O parser vê o
valor de verdade.

Aceita:
  - ./caminho                         ação local; o action.yml dela também é lido
  - dono/repo@<sha de 40 hex>         action ou workflow reutilizável
  - docker://imagem@sha256:<64 hex>   imagem fixada por digest
Reprova o resto: tag, branch, SHA abreviado, docker sem digest.

Lê todo .yml/.yaml de .github/workflows como workflow, seja qual for o nome,
as ações de .github/actions e toda ação local chamada por `uses: ./caminho`,
onde quer que esteja, porque uma ação local pode usar outra por tag por dentro.
Fica de fora: a imagem de `container:` e de `services:` e o FROM de Dockerfile.
"""

import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit(
        "::error::PyYAML ausente. A imagem ubuntu-latest traz o python3-yaml; se"
        " deixou de trazer, instale antes deste passo (sudo apt-get install -y python3-yaml)."
    )

SHA = re.compile(r"[^@\s]+@[0-9a-f]{40}")
SHA_MAIUSCULO = re.compile(r"[^@\s]+@[0-9a-fA-F]{40}")
DIGEST = re.compile(r"docker://[^@\s]+@sha256:[0-9a-f]{64}")
EXTENSOES = (".yml", ".yaml")


def valida(ref):
    """Devolve None se a referência é aceitável, ou o motivo da recusa."""
    if not isinstance(ref, str):
        return "valor de uses não é texto"
    if ref.startswith("./"):
        return None
    if ref.startswith("docker://"):
        return None if DIGEST.fullmatch(ref) else "imagem docker sem digest sha256"
    if SHA.fullmatch(ref):
        return None
    if SHA_MAIUSCULO.fullmatch(ref):
        return "SHA com letra maiúscula; escreva em minúsculas"
    return "sem SHA de commit com 40 caracteres"


def passos(valor):
    """Normaliza a lista de passos. Item que não é mapping é passo malformado."""
    if valor is None:
        return []
    if isinstance(valor, dict):
        return [valor]
    if isinstance(valor, list):
        return valor
    return [valor]


def problemas_dos_passos(prefixo, valor, locais):
    """Gera (lugar, problema) para cada passo inválido de uma lista de passos.

    Passo que não é mapping é malformado: `- uses:x@v1`, sem espaço depois dos
    dois-pontos, é texto para o YAML e não chama action nenhuma, mas é quase
    sempre um uses escrito errado e não deve passar em silêncio. As ações locais
    encontradas vão para `locais`, para serem lidas depois.
    """
    for i, passo in enumerate(passos(valor)):
        lugar = f"{prefixo}[{i}]"
        if not isinstance(passo, dict):
            yield lugar, f"passo malformado ({passo!r})"
        elif "uses" in passo:
            motivo = valida(passo["uses"])
            if motivo:
                yield lugar, f"{passo['uses']!r} — {motivo}"
            elif passo["uses"].startswith("./"):
                locais.add(passo["uses"])


def problemas_do_workflow(dados, locais):
    """Gera (lugar, problema) para cada referência inválida de um workflow."""
    jobs = dados.get("jobs")
    if not isinstance(jobs, dict):
        yield "jobs", "ausente ou não é mapping"
        return
    for nome, job in jobs.items():
        if not isinstance(job, dict):
            yield f"jobs.{nome}", "job não é mapping"
            continue
        # Workflow reutilizável. O local (./.github/workflows/x.yml) já é lido
        # com os outros workflows, então não entra em `locais`.
        if "uses" in job:
            motivo = valida(job["uses"])
            if motivo:
                yield f"jobs.{nome}", f"{job['uses']!r} — {motivo}"
        yield from problemas_dos_passos(f"jobs.{nome}.steps", job.get("steps"), locais)


def problemas_da_acao(dados, locais):
    """Gera (lugar, problema) para cada referência inválida de uma ação."""
    runs = dados.get("runs")
    if not isinstance(runs, dict):
        yield "runs", "ausente ou não é mapping"
        return
    imagem = runs.get("image")
    if isinstance(imagem, str) and imagem.startswith("docker://"):
        motivo = valida(imagem)
        if motivo:
            yield "runs.image", f"{imagem!r} — {motivo}"
    yield from problemas_dos_passos("runs.steps", runs.get("steps"), locais)


def acao_local(base, ref):
    """Acha o action.yml de `uses: ./caminho`, relativo à raiz do repositório."""
    for nome in ("action.yml", "action.yaml"):
        arquivo = base / ref / nome
        if arquivo.is_file():
            return arquivo
    return None


def anota(arquivo, texto):
    """Linha de erro que o GitHub mostra junto do arquivo, no PR."""
    texto = texto.replace("%", "%25").replace("\r", "%0D").replace("\n", "%0A")
    return f"::error file={arquivo}::{texto}"


def main(raiz):
    base = Path(raiz)
    pasta = base / ".github" / "workflows"
    workflows = sorted(
        p for p in (pasta.iterdir() if pasta.is_dir() else [])
        if p.is_file() and p.suffix.lower() in EXTENSOES
    )
    if not workflows:
        # Zero arquivo lido não pode virar sucesso: é cwd errado ou checkout
        # incompleto, e a guarda passaria sem ter olhado nada.
        print(f"::error::Nenhum workflow em {pasta}. Rode na raiz do repositório.")
        return 1
    acoes = sorted(
        p for p in (base / ".github" / "actions").glob("**/*")
        if p.is_file() and p.name.lower() in ("action.yml", "action.yaml")
    )

    # O tipo vem da pasta onde o arquivo foi achado, não do nome: um
    # .github/workflows/action.yml é workflow e tem os jobs lidos.
    fila = [(p, problemas_do_workflow) for p in workflows]
    fila += [(p, problemas_da_acao) for p in acoes]
    lidos, vistos, erros = set(), set(), []
    while fila:
        arquivo, checa = fila.pop(0)
        if arquivo.resolve() in lidos:
            continue
        lidos.add(arquivo.resolve())
        try:
            dados = yaml.safe_load(arquivo.read_text(encoding="utf-8"))
        except (yaml.YAMLError, UnicodeDecodeError) as e:
            erros.append(anota(arquivo, f"YAML ilegível ({e.__class__.__name__})"))
            continue
        if not isinstance(dados, dict):
            erros.append(anota(arquivo, "não é um mapping YAML"))
            continue
        locais = set()
        for lugar, problema in checa(dados, locais):
            erros.append(anota(arquivo, f"{lugar}: {problema}"))
        for ref in sorted(locais - vistos):
            vistos.add(ref)
            achado = acao_local(base, ref)
            if achado:
                fila.append((achado, problemas_da_acao))
            else:
                erros.append(anota(arquivo, f"{ref!r} — ação local sem action.yml no repositório"))

    if erros:
        print("\n".join(erros))
        print(
            f"{len(erros)} problema(s). Fixe pelo commit e anote a tag em comentário"
            " (uses: dono/repo@<sha> # v1). O SHA de uma tag sai de:"
            " gh api repos/DONO/REPO/commits/TAG -q .sha"
        )
        return 1
    print(f"Todas as actions estão fixadas por SHA ({len(lidos)} arquivo(s) lido(s)).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "."))
