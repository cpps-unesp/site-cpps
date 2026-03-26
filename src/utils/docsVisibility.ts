type DocsEntryLike = {
  id?: string;
  slug?: string;
  data: {
    draft?: boolean;
  };
};

function getEntrySlug(entry: DocsEntryLike): string {
  if (entry.slug) return entry.slug;
  if (entry.id) return entry.id.replace(/\.[^/.]+$/, '');
  return '';
}

export function hasHiddenSlugSegment(slug?: string): boolean {
  if (!slug) return false;

  return slug
    .split('/')
    .filter(Boolean)
    .some((segment) => segment.startsWith('_'));
}

export function isVisibleDocsEntry<T extends DocsEntryLike>(entry: T): boolean {
  if (entry.data.draft === true) return false;

  const entrySlug = getEntrySlug(entry);
  if (!entrySlug) return false;
  if (hasHiddenSlugSegment(entrySlug)) return false;

  return true;
}

export function filterVisibleDocsEntries<T extends DocsEntryLike>(entries: T[]): T[] {
  return entries.filter(isVisibleDocsEntry);
}
