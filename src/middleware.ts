import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

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

    // 1. Se já tem idioma na URL, continua normal
    if (/^\/(pt|en|es)(\/|$)/.test(path)) {
      return next();
    }

    // 2. Ignora assets estáticos
    if (/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff2?|ttf|webp|avif|json|xml|txt)$/.test(path)) {
      return next();
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
      return next();
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
    return redirect(newPath, 301);
  } catch (err) {
    console.error('Middleware error:', err);
    // Em caso de QUALQUER falha, deixa a requisição passar
    return next();
  }
});
