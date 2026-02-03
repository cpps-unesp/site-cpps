import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
type Lang = typeof SUPPORTED_LANGS[number];

/**
 * Faz parsing do header Accept-Language e retorna o idioma preferido
 * Exemplo: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7" → "pt"
 */
function parseAcceptLanguage(header: string): Lang {
  if (!header) return 'pt';
  
  // Parse cada idioma com sua prioridade
  const languages = header.split(',').map(part => {
    const [lang, qPart] = part.trim().split(';');
    const q = qPart ? parseFloat(qPart.replace('q=', '')) : 1.0;
    // Extrai apenas o código do idioma (pt-BR → pt, en-US → en)
    const langCode = lang.split('-')[0].toLowerCase();
    return { lang: langCode, q };
  });
  
  // Ordena por prioridade (maior q primeiro)
  languages.sort((a, b) => b.q - a.q);
  
  // Retorna o primeiro idioma suportado
  for (const { lang } of languages) {
    if (lang === 'pt' || lang === 'en' || lang === 'es') {
      return lang as Lang;
    }
  }
  
  return 'pt'; // fallback
}

export const onRequest = defineMiddleware(async ({ request, redirect, url, cookies }, next) => {
  const path = url.pathname;
  
  // 1. Se já tem idioma na URL, continua normal
  if (path.match(/^\/(pt|en|es)(\/|$)/)) {
    return next();
  }
  
  // 2. Ignora assets estáticos
  if (path.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff2?|ttf|webp|avif|json|xml|txt)$/)) {
    return next();
  }
  
  // 3. Ignora rotas especiais (pagefind, _astro, docs do Starlight, etc)
  if (path.startsWith('/_') || path.startsWith('/pagefind') || path.startsWith('/docs')) {
    return next();
  }
  
  // 4. Determina idioma preferido
  let lang: Lang = 'pt'; // fallback
  
  // 4a. Primeiro verifica cookie
  const cookieLang = cookies.get('lang')?.value;
  if (cookieLang && SUPPORTED_LANGS.includes(cookieLang as Lang)) {
    lang = cookieLang as Lang;
  } else {
    // 4b. Senão, detecta do navegador com parsing correto
    const acceptLang = request.headers.get('accept-language') ?? '';
    lang = parseAcceptLanguage(acceptLang);
  }
  
  // 5. Redireciona para URL com idioma
  const newPath = `/${lang}${path === '/' ? '/' : path}`;
  return redirect(newPath, 301);
});
