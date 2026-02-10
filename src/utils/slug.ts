export function getSlugFromMembro(membro: { slug?: string; nome: string }): string {
  if (membro.slug && membro.slug.trim() !== '') return membro.slug.trim();

  return membro.nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, ''); // remove caracteres inválidos
}
