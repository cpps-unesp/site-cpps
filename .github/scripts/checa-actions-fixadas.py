#!/usr/bin/env python3
"""Reprova qualquer action que não esteja fixada por SHA de commit.

Fixada por SHA, uma action não pode ser trocada por código hostil depois da
revisão: a tag é móvel, o commit não. Este script é a garantia de que ninguém
volta a usar tag.

Lê o YAML em vez de procurar texto com regex, porque regex não entende YAML:
flow mapping ({uses: x@v1}), chave entre aspas ("uses": x@v1), valor na linha
seguinte e "uses:" dentro de comentário passam por qualquer grep. O parser vê o
valor de verdade.

Aceita:
  - ./caminho                         ação local, versionada junto com o repo
  - dono/repo@<sha de 40 hex>         action ou workflow reutilizável
  - docker://imagem@sha256:<64 hex>   imagem fixada por digest
Reprova o resto: tag, branch, SHA abreviado, docker sem digest.

Varre os workflows e as actions compostas do repositório, porque uma action
local pode usar outra por tag por dentro.
"""

import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("::error::PyYAML ausente. Instale com: pip install pyyaml")

SHA = re.compile(r"^[^@\s]+@[0-9a-f]{40}$")
DIGEST = re.compile(r"^docker://[^@\s]+@sha256:[0-9a-f]{64}$")


def valida(ref):
    """Devolve None se a referência é aceitável, ou o motivo da recusa."""
    if not isinstance(ref, str):
        return "valor de uses não é texto"
    if ref.startswith("./"):
        return None
    if ref.startswith("docker://"):
        return None if DIGEST.match(ref) else "imagem docker sem digest sha256"
    return None if SHA.match(ref) else "sem SHA de commit com 40 caracteres"


def passos(valor):
    """Normaliza a lista de passos. Item que não é mapping é passo malformado."""
    if valor is None:
        return []
    if isinstance(valor, dict):
        return [valor]
    if isinstance(valor, list):
        return valor
    return [valor]


def problemas_dos_passos(prefixo, valor):
    """Gera (lugar, problema) para cada passo inválido de uma lista de passos.

    Passo que não é mapping é malformado: `- uses:x@v1`, sem espaço depois dos
    dois-pontos, é texto para o YAML e não chama action nenhuma, mas é quase
    sempre um uses escrito errado e não deve passar em silêncio.
    """
    for i, passo in enumerate(passos(valor)):
        lugar = f"{prefixo}[{i}]"
        if not isinstance(passo, dict):
            yield lugar, f"passo malformado ({passo!r})"
        elif "uses" in passo:
            motivo = valida(passo["uses"])
            if motivo:
                yield lugar, f"{passo['uses']!r} — {motivo}"


def problemas(arquivo, dados):
    """Gera (lugar, problema) para cada referência inválida do arquivo."""
    if not isinstance(dados, dict):
        return
    if arquivo.name in ("action.yml", "action.yaml"):
        yield from problemas_dos_passos("runs.steps", (dados.get("runs") or {}).get("steps"))
        return
    for nome, job in (dados.get("jobs") or {}).items():
        if not isinstance(job, dict):
            continue
        if "uses" in job:  # workflow reutilizável
            motivo = valida(job["uses"])
            if motivo:
                yield f"jobs.{nome}", f"{job['uses']!r} — {motivo}"
        yield from problemas_dos_passos(f"jobs.{nome}.steps", job.get("steps"))


def main(raiz):
    base = Path(raiz)
    arquivos = sorted(
        [*base.glob(".github/workflows/*.yml"), *base.glob(".github/workflows/*.yaml"),
         *base.glob(".github/actions/**/action.yml"), *base.glob(".github/actions/**/action.yaml")]
    )
    erros = []
    for arquivo in arquivos:
        try:
            dados = yaml.safe_load(arquivo.read_text(encoding="utf-8"))
        except yaml.YAMLError as e:
            erros.append(f"{arquivo}: YAML inválido ({e.__class__.__name__})")
            continue
        for lugar, problema in problemas(arquivo, dados):
            erros.append(f"{arquivo} {lugar}: {problema}")
    if erros:
        print("::error::Action sem fixação por SHA. Fixe pelo commit e anote a tag em comentário.")
        print("\n".join(erros))
        return 1
    print(f"Todas as actions estão fixadas por SHA ({len(arquivos)} arquivo(s) lido(s)).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "."))
