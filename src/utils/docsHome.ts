import { isVisibleDocsEntry } from './docsVisibility';

type DocsEntryLike = {
  id?: string;
  slug?: string;
  data: {
    sidebar_order?: number;
    draft?: boolean;
  };
};

function getEntrySlug(entry: DocsEntryLike): string {
  if (entry.slug) return entry.slug;
  if (entry.id) return entry.id.replace(/\.[^/.]+$/, '');
  return '';
}

function compareDocsOrder(a: DocsEntryLike, b: DocsEntryLike): number {
  const orderA = a.data.sidebar_order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.sidebar_order ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const slugA = getEntrySlug(a);
  const slugB = getEntrySlug(b);

  return slugA.localeCompare(slugB, 'pt-BR');
}

export function selectDocsHomeEntry<T extends DocsEntryLike>(entries: T[]): T | undefined {
  const visibleEntries = entries.filter(isVisibleDocsEntry);

  if (visibleEntries.length === 0) return undefined;

  return [...visibleEntries].sort(compareDocsOrder)[0];
}
