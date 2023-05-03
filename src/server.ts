import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import express from 'express';
import { createServer, ViteDevServer } from 'vite';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

async function start(root = process.cwd(), hmrPort = 6655) {
  const app = express();

  const vite: ViteDevServer = await createServer({
    root,
    logLevel: 'info',
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
      hmr: {
        port: hmrPort,
      },
    },
    appType: 'custom',
  });
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    try {
      const htmlContent = await readFile(path.resolve(DIRNAME, 'index.html'), 'utf-8');

      const url = req.originalUrl;

      const { render } = await vite.ssrLoadModule('/src/entry-server.tsx');

      const htmlFromVite = await vite.transformIndexHtml(url, htmlContent);
      const htmlParts = htmlFromVite.split('<!--app-html-->');

      res.setHeader('content-type', 'text/html');

      res.write(htmlParts[0]);

      const renderStream = render(url, {
        onShellReady: () => {
          renderStream.pipe(res);
        },
        onAllReady: () => {
          res.write(htmlParts[1]);
          res.end();
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app, vite };
}

start().then(({ app }) =>
  app.listen(5173, () => {
    console.log(`http://localhost:5173`);
  })
);
