import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const STATIC_ASSET_REGEX = /\.(ico|png|jpg|jpeg|gif|svg|css|js|woff2?|ttf|webp|avif|json|xml|txt)$/;

function getLangFromPath(path: string): Lang | null {
  const match = path.match(/^\/(pt|en|es)(\/|$)/);
  if (!match) return null;
  return match[1] as Lang;
}

function shouldTrack404(path: string): boolean {
  if (STATIC_ASSET_REGEX.test(path)) {
    return false;
  }

  if (
    path.startsWith('/_') ||
    path.startsWith('/.well-known') ||
    path.startsWith('/pagefind') ||
    path.startsWith('/favicon') ||
    path.startsWith('/robots.txt') ||
    path.startsWith('/sitemap')
  ) {
    return false;
  }

  return true;
}

function logNotFoundEvent(
  context: { request: Request; url: URL },
  path: string
): void {
  const referer = context.request.headers.get('referer') ?? null;
  const userAgent = context.request.headers.get('user-agent') ?? null;
  const requestId = context.request.headers.get('cf-ray') ?? null;
  const langFromPath = getLangFromPath(path);

  console.warn(
    JSON.stringify({
      event: 'http_404',
      timestamp: new Date().toISOString(),
      method: context.request.method,
      path,
      query: context.url.search || '',
      status: 404,
      referer,
      userAgent,
      lang: langFromPath,
      requestId,
    })
  );
}

function parseAcceptLanguage(header: string | null): Lang {
  if (!header) return 'pt';

  try {
    const languages = header.split(',').map((part) => {
      const [lang, qPart] = part.trim().split(';');
      const q = qPart ? parseFloat(qPart.replace('q=', '')) : 1.0;
      const langCode = lang.split('-')[0].toLowerCase();
      return { lang: langCode, q };
    });

    languages.sort((a, b) => b.q - a.q);

    for (const { lang } of languages) {
      if (SUPPORTED_LANGS.includes(lang as Lang)) {
        return lang as Lang;
      }
    }
  } catch {
    // se qualquer parsing falhar, cai no fallback
  }

  return 'pt';
}

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const { request, redirect, url, cookies } = context;
    const path = url?.pathname || '/';

    const runNext = async () => {
      const response = await next();

      if (response.status === 404 && shouldTrack404(path)) {
        logNotFoundEvent(context, path);
      }

      return response;
    };

    // 1. Se já tem idioma na URL, continua normal
    if (/^\/(pt|en|es)(\/|$)/.test(path)) {
      return runNext();
    }

    // 2. Ignora assets estáticos
    if (STATIC_ASSET_REGEX.test(path)) {
      return runNext();
    }

    // 3. Ignora rotas especiais
    if (
      path.startsWith('/_') ||
      path.startsWith('/.well-known') ||
      path.startsWith('/pagefind') ||
      path.startsWith('/docs') ||
      path === '/404' ||
      path === '/404/'
    ) {
      return runNext();
    }

    let lang: Lang = 'pt';

    // 4a. Cookie (com proteção)
    let cookieLang: string | undefined;

    try {
      cookieLang = cookies?.get?.('lang')?.value;
    } catch {
      cookieLang = undefined;
    }

    if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as Lang)) {
      lang = cookieLang as Lang;
    } else {
      // 4b. Detecta do navegador
      const acceptLang = request?.headers?.get?.('accept-language') ?? '';
      lang = parseAcceptLanguage(acceptLang);
    }

    const newPath = `/${lang}${path === '/' ? '/' : path}`;
    return redirect(newPath, 307);
  } catch (err) {
    console.error('Middleware error:', err);
    // Em caso de QUALQUER falha, deixa a requisição passar
    return next();
  }
});
