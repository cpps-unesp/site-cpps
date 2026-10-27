import { defineMiddleware } from 'astro:middleware';

// `i18n.routing: 'manual'` exige este arquivo. Não há o que fazer aqui: as rotas
// [lang] do site já resolvem /pt/, /en/ e /es/.
export const onRequest = defineMiddleware((_context, next) => next());
