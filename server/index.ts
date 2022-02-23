import { loadEnvConfig } from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import next from 'next';
import express from 'express';
import { databaseClient } from './database';
import { runWatchers } from './watchers';
import path from 'path';
import { transactionsHandler } from './api/transactions';
import { accountInfoHandler } from './api/account-info';

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOST || 'localhost';
const port = parseInt(process.env.PORT || '3000');
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  await databaseClient.init();
  await runWatchers();

  const server = express();

  // Serve static files.
  server.use(express.static(path.join(__dirname, '../public')));
  server.use('/_next', express.static(path.join(__dirname, '../.next')));

  server.get('/api/transactions', transactionsHandler);
  server.get('/api/account-info', accountInfoHandler);

  server.all('*', async (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
