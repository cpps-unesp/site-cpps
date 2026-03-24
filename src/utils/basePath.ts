export function normalizeBaseUrl(baseUrl: string): string {
  if (!baseUrl || baseUrl === '/') {
    return '/';
  }

  const trimmed = baseUrl.replace(/^\/|\/$/g, '');
  return `/${trimmed}/`;
}

export function withBasePath(path: string, baseUrl: string): string {
  const normalizedBase = normalizeBaseUrl(baseUrl);
  const normalizedPath = path.replace(/^\/+/, '');

  if (normalizedBase === '/') {
    return `/${normalizedPath}`.replace(/\/+/g, '/');
  }

  return `${normalizedBase}${normalizedPath}`.replace(/\/+/g, '/');
}

export function stripBaseFromPathname(pathname: string, baseUrl: string): string {
  const normalizedBase = normalizeBaseUrl(baseUrl);

  if (normalizedBase === '/') {
    return pathname;
  }

  if (pathname === normalizedBase.slice(0, -1)) {
    return '/';
  }

  if (pathname.startsWith(normalizedBase)) {
    return `/${pathname.slice(normalizedBase.length)}`.replace(/\/+/g, '/');
  }

  return pathname;
}