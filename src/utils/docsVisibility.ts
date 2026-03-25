type DocsEntryLike = {
  slug?: string;
  data: {
    draft?: boolean;
  };
};

export function hasHiddenSlugSegment(slug?: string): boolean {
  if (!slug) return false;

  return slug
    .split('/')
    .filter(Boolean)
    .some((segment) => segment.startsWith('_'));
}

export function isVisibleDocsEntry<T extends DocsEntryLike>(entry: T): boolean {
  if (entry.data.draft === true) return false;
  if (!entry.slug) return false;
  if (hasHiddenSlugSegment(entry.slug)) return false;
  return true;
}

export function filterVisibleDocsEntries<T extends DocsEntryLike>(entries: T[]): T[] {
  return entries.filter(isVisibleDocsEntry);
}
