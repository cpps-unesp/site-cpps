export function getLangFromUrl(url) {
  const supportedLangs = ['pt', 'en', 'es'];
  
  const pathParts = url.pathname.split('/').filter(Boolean);
  
  const lang = pathParts[0] || 'pt';

  return supportedLangs.includes(lang) ? lang : 'pt';
}
