const exactAliases: Record<string, string> = {
  'geral/info/processo-seletivo': 'infos-gerais/03processo',
  'geral/info/estagio-voluntario': 'infos-gerais/04voluntario',
  'projetos/sistemas/site/markdown/geral': 'projetos/sistemas/websites/markdown/01-geral',
  'projetos/sistemas/site/editar/static': 'projetos/sistemas/websites/editar/07-infos-estaticas',
  equipe: 'projetos/sistemas/websites/editar/03-equipe',
  'projetos/ensino/trilha-dados/ambiente/intro':
    'projetos/ensino/tfdt/trilha/paradas/ambiente/01-intro',
  'projetos/ensino/trilha-dados/linguagens/python/intro':
    'projetos/ensino/tfdt/trilha/paradas/fundamentos-python/01-intro',
  'projetos/ensino/trilha-dados/coleta-dados/intro':
    'projetos/ensino/tfdt/trilha/paradas/coleta-dados/intro',
  'projetos/ensino/trilha-dados/analise-dados/intro':
    'projetos/ensino/tfdt/trilha/paradas/analise-dados/00-intro',
  'projetos/ensino/trilha-dados/banco-dados/intro':
    'projetos/ensino/tfdt/trilha/paradas/banco-dados/intro',
  'projetos/ensino/trilha-dados/metodos-quanti/intro':
    'projetos/ensino/tfdt/trilha/paradas/metodos-quanti/intro',
  'projetos/ensino/tec-digitais/conhecimentos/intro':
    'projetos/ensino/tecnologiasdigitais/conhecimentos/intro',
  'projetos/ensino/tec-digitais/anotacoes/intro':
    'projetos/ensino/tecnologiasdigitais/anotacoes/intro',
  'projetos/ensino/tec-digitais/edicao-texto/intro':
    'projetos/ensino/tecnologiasdigitais/edicao-texto/intro',
  'projetos/ensino/tec-digitais/buscadores/intro':
    'projetos/ensino/tecnologiasdigitais/buscadores/intro',
  'projetos/ensino/tec-digitais/audio/intro': 'projetos/ensino/tecnologiasdigitais/audio/intro',
  'projetos/ensino/acesso-remoto/explicar': 'projetos/ensino/acessoremoto/explicar',
  'projetos/ensino/acesso-remoto/solicitar-acesso': 'projetos/ensino/acessoremoto/solicitar-acesso',
  'projetos/ensino/acesso-remoto/instrucao-inicial': 'projetos/ensino/acessoremoto/instruir',
};

export function normalizeLegacyAtividadesSlug(rawSlug: string): string {
  const slug = rawSlug.replace(/^\/+|\/+$/g, '');
  if (!slug) return slug;

  if (exactAliases[slug]) {
    return exactAliases[slug];
  }

  return slug;
}
