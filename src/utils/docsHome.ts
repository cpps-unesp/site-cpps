import { isVisibleDocsEntry } from './docsVisibility';

type DocsEntryLike = {
  slug: string;
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

  return a.slug.localeCompare(b.slug, 'pt-BR');
}

export function selectDocsHomeEntry<T extends DocsEntryLike>(entries: T[]): T | undefined {
  const visibleEntries = entries.filter(isVisibleDocsEntry);

  if (visibleEntries.length === 0) return undefined;

  return [...visibleEntries].sort(compareDocsOrder)[0];
}
