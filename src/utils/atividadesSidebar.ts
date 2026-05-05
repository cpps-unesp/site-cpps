import type { CollectionEntry } from 'astro:content';
import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';
import { filterVisibleDocsEntries, getDocsEntrySlug } from './docsVisibility';

type AtividadeEntry = CollectionEntry<'atividades'>;

const externalResources: SidebarItem = {
  label: 'Recursos Externos',
  items: [
    { label: 'Lantri Hub', url: 'https://lantri.org' },
    { label: 'GitHub Org', url: 'https://github.com/cpps-unesp' },
  ],
};

const hiddenEnsinoSidebarPrefixes = [
  'projetos/ensino/acessoremoto',
  'projetos/ensino/assinatura',
  'projetos/ensino/curso',
  'projetos/ensino/filezilla',
  'projetos/ensino/id-visual',
  'projetos/ensino/iniciativas',
  'projetos/ensino/recoll',
];

function isHiddenFromAtividadesSidebar(entry: AtividadeEntry): boolean {
  const slug = getDocsEntrySlug(entry);

  return hiddenEnsinoSidebarPrefixes.some(
    (prefix) => slug === prefix || slug.startsWith(`${prefix}/`)
  );
}

export function buildAtividadesSidebar(entries: AtividadeEntry[]): SidebarItem[] {
  return buildAtividadesSidebarWithBase(entries, '/wiki');
}

export function buildAtividadesSidebarWithBase(
  entries: AtividadeEntry[],
  basePath: string
): SidebarItem[] {
  const visibleEntries = filterVisibleDocsEntries(entries).filter(
    (entry) => !isHiddenFromAtividadesSidebar(entry)
  );

  return buildDocsSidebar(visibleEntries, {
    basePath,
    sectionLabel: 'Atividades',
    externalResources,
  });
}
