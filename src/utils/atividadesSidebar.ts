import type { CollectionEntry } from 'astro:content';
import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';
import { filterVisibleDocsEntries } from './docsVisibility';

type AtividadeEntry = CollectionEntry<'atividades'>;

const externalResources: SidebarItem = {
  label: 'Recursos Externos',
  items: [
    { label: 'Lantri Hub', url: 'https://lantri.org' },
    { label: 'GitHub Org', url: 'https://github.com/cpps-unesp' },
  ],
};

export function buildAtividadesSidebar(entries: AtividadeEntry[]): SidebarItem[] {
  return buildAtividadesSidebarWithBase(entries, '/wiki');
}

export function buildAtividadesSidebarWithBase(
  entries: AtividadeEntry[],
  basePath: string
): SidebarItem[] {
  const visibleEntries = filterVisibleDocsEntries(entries);

  return buildDocsSidebar(visibleEntries, {
    basePath,
    sectionLabel: 'Atividades',
    externalResources,
  });
}
