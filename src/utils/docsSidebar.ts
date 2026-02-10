import type { SidebarItem } from '../types/docs';

type DocEntry = {
  slug: string;
  data: {
    title?: string;
    sidebar_label?: string;
    sidebar_section?: 'geral';
    sidebar_order?: number;
  };
};

type SidebarNode = {
  label: string;
  url?: string;
  items: Map<string, SidebarNode>;
};

type BuildDocsSidebarOptions = {
  basePath: string;
  introLabel?: string;
  sectionLabel?: string;
  externalResources?: SidebarItem;
};

const acronymMap: Record<string, string> = {
  tfdt: 'TFDT',
  md: 'MD',
  ocr: 'OCR',
  css: 'CSS',
  html: 'HTML',
  js: 'JS',
  d3: 'D3',
  api: 'API',
  ipri: 'IPRI',
  cpps: 'CPPS',
};

function normalizePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed.endsWith('/index') ? trimmed.slice(0, -6) : trimmed;
}

function titleFromSegment(segment: string): string {
  const clean = segment
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]+/g, ' ')
    .trim();

  if (!clean) return 'Pagina';

  return clean
    .split(' ')
    .map((part) => {
      const lower = part.toLowerCase();
      if (acronymMap[lower]) return acronymMap[lower];
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(' ');
}

function createNode(label: string): SidebarNode {
  return { label, items: new Map() };
}

function nodeToSidebarItems(node: SidebarNode): SidebarItem[] {
  return Array.from(node.items.entries())
    .sort(([a], [b]) => a.localeCompare(b, 'pt-BR'))
    .map(([, child]) => {
      const nestedItems = nodeToSidebarItems(child);
      return {
        label: child.label,
        url: child.url,
        items: nestedItems.length > 0 ? nestedItems : undefined,
      };
    });
}

export function buildDocsSidebar(entries: DocEntry[], options: BuildDocsSidebarOptions): SidebarItem[] {
  const root = createNode(options.sectionLabel ?? 'Documentacao');
  const customIntroItems: Array<{ label: string; url: string; order: number }> = [];

  for (const entry of entries) {
    const segments = entry.slug.split('/').filter(Boolean);
    const pagePath = normalizePath(`${options.basePath}/${entry.slug}`);
    const pageLabel = entry.data.sidebar_label || entry.data.title || titleFromSegment(segments[segments.length - 1] || 'pagina');
    const sidebarSection = entry.data.sidebar_section;
    const sidebarOrder = entry.data.sidebar_order ?? 9999;

    if (segments.length === 0) continue;

    if (sidebarSection === 'geral') {
      customIntroItems.push({
        label: pageLabel,
        url: pagePath,
        order: sidebarOrder,
      });
      continue;
    }

    let currentNode = root;
    let currentPath = options.basePath;

    for (let i = 0; i < segments.length; i += 1) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;
      const isIndex = segment === 'index';

      if (isIndex && isLast) {
        currentNode.url = normalizePath(currentPath);
        currentNode.label = pageLabel;
        break;
      }

      currentPath = `${currentPath}/${segment}`;

      if (!currentNode.items.has(segment)) {
        currentNode.items.set(segment, createNode(titleFromSegment(segment)));
      }

      const nextNode = currentNode.items.get(segment);
      if (!nextNode) break;

      currentNode = nextNode;

      if (isLast) {
        currentNode.url = pagePath;
        currentNode.label = pageLabel;
      }
    }
  }

  const generatedItems = nodeToSidebarItems(root);
  const introItems = [
    { label: options.introLabel ?? 'Introducao', url: options.basePath },
    ...customIntroItems
      .sort((a, b) => (a.order - b.order) || a.label.localeCompare(b.label, 'pt-BR'))
      .map(({ label, url }) => ({ label, url })),
  ].filter((item, index, items) => items.findIndex((candidate) => candidate.url === item.url) === index);

  return [
    {
      label: 'Geral',
      items: introItems,
    },
    ...generatedItems,
    ...(options.externalResources ? [options.externalResources] : []),
  ];
}
