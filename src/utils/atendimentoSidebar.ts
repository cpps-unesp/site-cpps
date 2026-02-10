import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';

type AtendimentoEntry = {
  slug: string;
  data: {
    title?: string;
    sidebar_label?: string;
    sidebar_section?: 'geral';
    sidebar_order?: number;
  };
};

export function buildAtendimentoSidebar(entries: AtendimentoEntry[], basePath: string): SidebarItem[] {
  return buildDocsSidebar(entries, {
    basePath,
    sectionLabel: 'Atendimento',
  });
}
