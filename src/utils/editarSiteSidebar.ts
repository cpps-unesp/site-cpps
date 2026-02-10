import type { SidebarItem } from '../types/docs';
import { buildDocsSidebar } from './docsSidebar';

type EditarSiteEntry = {
  slug: string;
  data: {
    title?: string;
    sidebar_label?: string;
    sidebar_section?: 'geral';
    sidebar_order?: number;
  };
};

export function buildEditarSiteSidebar(entries: EditarSiteEntry[], basePath: string): SidebarItem[] {
  return buildDocsSidebar(entries, {
    basePath,
    sectionLabel: 'Editar site',
  });
}
