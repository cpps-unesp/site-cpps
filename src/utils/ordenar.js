/**
 * Ordena uma lista por prioridade (numérica) e nome (alfabético) como fallback.
 * Se a prioridade for inválida ou vazia, o nome será usado para ordenação.
 *
 * @param {Array<Object>} lista - Lista de objetos
 * @param {string} chavePrioridade - Chave numérica usada para ordenar (ex: "prioridade")
 * @param {string} chaveNome - Chave de nome usada como fallback (ex: "nome")
 * @returns {Array<Object>} Lista ordenada
 */
export function ordenarPorPrioridadeOuNome(lista, chavePrioridade = "prioridade", chaveNome = "nome") {
  function parsePrioridade(valor) {
    try {
      const num = parseInt(valor);
      return isNaN(num) ? null : num;
    } catch {
      return null;
    }
  }

  return lista.slice().sort((a, b) => {
    const pa = parsePrioridade(a[chavePrioridade]);
    const pb = parsePrioridade(b[chavePrioridade]);

    if (pa !== null && pb !== null) return pa - pb;
    if (pa !== null) return -1;
    if (pb !== null) return 1;

    const nomeA = a[chaveNome]?.toLowerCase?.() || "";
    const nomeB = b[chaveNome]?.toLowerCase?.() || "";
    return nomeA.localeCompare(nomeB);
  });
}
