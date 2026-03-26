export const PUBLICATION_TYPES = [
  'material-didatico',
  'tutorial',
] as const;

export type PublicationType = (typeof PUBLICATION_TYPES)[number];

export function formatPublicationTypeLabel(type: string): string {
  return type
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}