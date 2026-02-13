import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () => {
  return Response.redirect('/pt/atividades', 302);
};
