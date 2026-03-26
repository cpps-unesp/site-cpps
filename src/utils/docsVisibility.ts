type DocsEntryLike = {
  id?: string;
  slug?: string;
  data: {
    draft?: boolean;
    custom_slug?: DocsCustomSlug;
  };
};

export type DocsLang = 'pt' | 'en' | 'es';
export type DocsCustomSlug = string | Partial<Record<DocsLang, string>>;

function normalizeCustomSlug(customSlug?: string): string {
  if (!customSlug) return '';

  return customSlug.trim().replace(/^\/+|\/+$/g, '');
}

function resolveCustomSlug(customSlug?: DocsCustomSlug, lang?: DocsLang): string {
  if (!customSlug) return '';

  if (typeof customSlug === 'string') {
    return normalizeCustomSlug(customSlug);
  }

  if (lang) {
    return normalizeCustomSlug(customSlug[lang]);
  }

  for (const fallbackLang of ['pt', 'en', 'es'] as const) {
    const slug = normalizeCustomSlug(customSlug[fallbackLang]);
    if (slug) return slug;
  }

  return '';
}

export function getDocsEntryDefaultSlug(entry: DocsEntryLike): string {
  if (entry.slug) return entry.slug;
  if (entry.id) return entry.id.replace(/\.[^/.]+$/, '');
  return '';
}

export function getDocsEntrySlug(entry: DocsEntryLike, lang?: DocsLang): string {
  const customSlug = resolveCustomSlug(entry.data.custom_slug, lang);
  if (customSlug) return customSlug;

  return getDocsEntryDefaultSlug(entry);
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

  const entrySlug = getDocsEntrySlug(entry);
  if (!entrySlug) return false;
  if (hasHiddenSlugSegment(entrySlug)) return false;

  return true;
}

export function filterVisibleDocsEntries<T extends DocsEntryLike>(entries: T[]): T[] {
  return entries.filter(isVisibleDocsEntry);
}
