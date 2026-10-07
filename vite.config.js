import { defineConfig } from 'vite';

export default defineConfig({
 server: {
  watch: {
   // Polling avoids Windows file-lock watcher failures while retaining assets.
   usePolling: true,
   interval: 1000,
  },
 },
});
