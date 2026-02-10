/**
 * Ordena uma lista por prioridade (numérica) e nome (alfabético) como fallback.
 * Se a prioridade for inválida ou vazia, o nome será usado para ordenação.
 *
 * @param lista - Lista de objetos
 * @param chavePrioridade - Chave numérica usada para ordenar (ex: "prioridade")
 * @param chaveNome - Chave de nome usada como fallback (ex: "nome")
 * @param ordem - Direção da ordenação ("asc" ou "desc")
 * @returns Lista ordenada
 */
export function ordenarPorPrioridadeOuNome<T extends Record<string, any>>(
  lista: T[],
  chavePrioridade: string = 'prioridade',
  chaveNome: string = 'nome',
  ordem: 'asc' | 'desc' = 'asc'
): T[] {
  function parsePrioridade(valor: any): number | null {
    try {
      const num = parseInt(valor);
      return isNaN(num) ? null : num;
    } catch {
      return null;
    }
  }

  const multiplicador = ordem === 'asc' ? 1 : -1;

  return lista.slice().sort((a, b) => {
    const pa = parsePrioridade(a[chavePrioridade]);
    const pb = parsePrioridade(b[chavePrioridade]);

    if (pa !== null && pb !== null) return (pa - pb) * multiplicador;
    if (pa !== null) return -1 * multiplicador;
    if (pb !== null) return 1 * multiplicador;

    const nomeA = (a[chaveNome] as string)?.toLowerCase?.() || '';
    const nomeB = (b[chaveNome] as string)?.toLowerCase?.() || '';
    return nomeA.localeCompare(nomeB) * multiplicador;
  });
}
