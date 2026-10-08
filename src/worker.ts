// Entrada do Worker: o site Astro (fetch) e as tarefas agendadas do EmDash (cron).
import type { ExportedHandler } from '@cloudflare/workers-types/index.ts';
import handler, { createScheduledHandler, PluginBridge } from '@emdash-cms/cloudflare/worker';

export { PluginBridge };

export default {
  ...handler,
  // Sem argumento, roda a cada disparo de `triggers.crons` (no wrangler.jsonc, a
  // cada minuto). O guia do EmDash pede, para outro intervalo, a mesma expressão
  // em `{ generalCron: '<expressão>' }` e em `triggers.crons`.
  scheduled: createScheduledHandler(),
} satisfies ExportedHandler;
