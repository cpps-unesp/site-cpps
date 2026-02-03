import { defineMiddleware } from 'astro:middleware';

const SUPPORTED_LANGS = ['pt', 'en', 'es'] as const;
type Lang = typeof SUPPORTED_LANGS[number];

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
    // 4b. Senão, detecta do navegador
    const acceptLang = request.headers.get('accept-language') ?? '';
    
    // Verifica espanhol primeiro (es, es-ES, es-MX, etc)
    if (acceptLang.match(/^es\b|,\s*es\b/i)) {
      lang = 'es';
    // Verifica inglês (en, en-US, en-GB, etc)
    } else if (acceptLang.match(/^en\b|,\s*en\b/i)) {
      lang = 'en';
    }
    // pt é fallback padrão
  }
  
  // 5. Redireciona para URL com idioma
  const newPath = `/${lang}${path === '/' ? '/' : path}`;
  return redirect(newPath, 301);
});
