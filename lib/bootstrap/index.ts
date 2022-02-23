import { databaseClient } from '../database';
import { SchemaFieldTypes } from 'redis';

type GlobalType = typeof globalThis & {
  isBootstrapped: boolean;
};

(global as GlobalType).isBootstrapped = false;

export default async function bootstrap() {
  if ((global as GlobalType).isBootstrapped || typeof window !== 'undefined')
    return;
  (global as GlobalType).isBootstrapped = true;

  console.log('Bootstraping');

  await databaseClient.connect();
  await databaseClient.createIndexes([
    {
      index: 'idx1:transactions',
      schema: {
        address: SchemaFieldTypes.TAG,
        timestamp: SchemaFieldTypes.NUMERIC,
      },
    },
  ]);

  // only on server-side
  const { run } = require('../watchers/quid');

  await run();
}
