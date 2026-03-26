import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';
import { filterVisibleDocsEntries } from './docsVisibility';

type DocsLang = 'pt' | 'en' | 'es';
type DocsCustomSlug = string | Partial<Record<DocsLang, string>>;

type EditarSiteEntry = {
  id?: string;
  slug?: string;
  data: {
    title?: string;
    custom_slug?: DocsCustomSlug;
    sidebar_label?: string;
    sidebar_section?: string;
    sidebar_order?: number;
    draft?: boolean;
  };
};

export function buildEditarSiteSidebar(
  entries: EditarSiteEntry[],
  basePath: string
): SidebarItem[] {
  const visibleEntries = filterVisibleDocsEntries(entries);

  return buildDocsSidebar(visibleEntries, {
    basePath,
    sectionLabel: 'Editar site',
  });
}
