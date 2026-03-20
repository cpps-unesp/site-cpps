import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
  return Response.redirect('/pt/', 301);
};
