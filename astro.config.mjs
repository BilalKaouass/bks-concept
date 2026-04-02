import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://bksconcept.netlify.app',
  output: 'static',
  integrations: [tailwind()]
});