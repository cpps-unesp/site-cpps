import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';
import { filterVisibleDocsEntries } from './docsVisibility';

type AtendimentoEntry = {
  slug: string;
  data: {
    title?: string;
    sidebar_label?: string;
    sidebar_section?: string;
    sidebar_order?: number;
    draft?: boolean;
  };
};

export function buildAtendimentoSidebar(
  entries: AtendimentoEntry[],
  basePath: string
): SidebarItem[] {
  const visibleEntries = filterVisibleDocsEntries(entries);

  return buildDocsSidebar(visibleEntries, {
    basePath,
    sectionLabel: 'Atendimento',
  });
}
