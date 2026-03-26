import { getDocsEntrySlug, isVisibleDocsEntry } from './docsVisibility';

type DocsEntryLike = {
  id?: string;
  slug?: string;
  data: {
    sidebar_order?: number;
    draft?: boolean;
  };
};

function compareDocsOrder(a: DocsEntryLike, b: DocsEntryLike): number {
  const orderA = a.data.sidebar_order ?? Number.MAX_SAFE_INTEGER;
  const orderB = b.data.sidebar_order ?? Number.MAX_SAFE_INTEGER;

  if (orderA !== orderB) {
    return orderA - orderB;
  }

  const slugA = getDocsEntrySlug(a);
  const slugB = getDocsEntrySlug(b);

  return slugA.localeCompare(slugB, 'pt-BR');
}

export function selectDocsHomeEntry<T extends DocsEntryLike>(entries: T[]): T | undefined {
  const visibleEntries = entries.filter(isVisibleDocsEntry);

  if (visibleEntries.length === 0) return undefined;

  return [...visibleEntries].sort(compareDocsOrder)[0];
}
