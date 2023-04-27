import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { ViteDevServer } from 'vite';

const DIRNAME = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;

// process.env.MY_CUSTOM_SECRET = 'API_KEY_qwertyuiop';

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort = 6655
) {
  const resolve = (subpath: string) => path.resolve(DIRNAME, subpath);

  // const indexProd = isProd ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8') : '';

  const app = express();

  let vite: ViteDevServer = null!;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
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
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;

      // let template;
      let render;
      if (!isProd) {
        // template = fs.readFileSync(resolve('index.html'), 'utf-8');
        // template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        // template = indexProd;
        const entryServer = './dist/server/entry-server.js';
        render = (await import(entryServer)).render;
      }

      res.setHeader('content-type', 'text/html');

      res.write(`<!DOCTYPE html>
        <html lang="en">

        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vite + React + TS</title>
        </head>

        <body>
        <div id="root">`);

      const renderStream = render(url, {
        onShellReady: () => {
          renderStream.pipe(res).on('finish', () => {
            res.end(`</div>
              <div id="modal"></div>
            </body>
            </html>`);
          });
        },
        bootstrapScripts: ['/entry-client.js'],
      });
    } catch (e) {
      if (e instanceof Error) {
        if (!isProd) {
          vite.ssrFixStacktrace(e);
        }
        console.log(e.stack);
        res.status(500).end(e.stack);
      }
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log('http://localhost:5173');
    })
  );
}
