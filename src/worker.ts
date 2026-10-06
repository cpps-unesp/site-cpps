// Entrada do Worker: o site Astro (fetch) e as tarefas agendadas do EmDash (cron).
import type { ExportedHandler } from '@cloudflare/workers-types/index.ts';
import handler, { createScheduledHandler, PluginBridge } from '@emdash-cms/cloudflare/worker';

export { PluginBridge };

export default {
  ...handler,
  scheduled: createScheduledHandler(),
} satisfies ExportedHandler;
