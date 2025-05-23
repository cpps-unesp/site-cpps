// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
   site: 'https://site-cpps.github.io',
  base: 'site-cpps',
  integrations: [ starlight({ title: 'CPPS/UNESP' })]
});