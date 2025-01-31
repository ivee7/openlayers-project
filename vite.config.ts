import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

function getAliasUrl(url: string) {
  return fileURLToPath(new URL(url, import.meta.url));
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: /@\//, replacement: getAliasUrl('./src/') },
      { find: '@ol-api', replacement: getAliasUrl('./src/shared/api') },
      { find: '@ol-ui', replacement: getAliasUrl('./src/shared/ui') },
      { find: '@ol-utils', replacement: getAliasUrl('./src/shared/utils') },
      { find: '@ol-entities', replacement: getAliasUrl('./src/entities') },
    ],
  },
})
