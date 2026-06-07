import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Simple plugin to simulate Vercel serverless functions locally in Vite
const apiPlugin = () => ({
  name: 'api-plugin',
  configureServer(server) {
    server.middlewares.use(async (req, res, next) => {
      // Intercept our specific API route
      if (req.url === '/api/feed') {
        try {
          // Dynamically import the handler (appends a timestamp to bypass cache if needed, but simple import is fine)
          const handler = await import('./api/feed.js');
          
          // Inject Vite env into process.env so the serverless function can read them
          const env = loadEnv(server.config.mode, process.cwd(), '');
          process.env.VITE_INSTAGRAM_API_URL = env.VITE_INSTAGRAM_API_URL;
          process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;

          // Polyfill Vercel's res.status() and res.json() methods
          res.status = (code) => {
            res.statusCode = code;
            return res;
          };
          res.json = (data) => {
            if (!res.hasHeader('Content-Type')) {
              res.setHeader('Content-Type', 'application/json');
            }
            res.end(JSON.stringify(data));
          };

          await handler.default(req, res);
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
      } else {
        next();
      }
    });
  }
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
})
