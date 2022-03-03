import { createQuidContract } from '../../lib/contracts';
import { handleMint } from '../database/aggregator';

export async function runWatchers() {
  const watcher = createQuidContract();
  console.log(`[ContactWatcher]: Start watching: ${watcher.address}`);

  watcher.on('Mint', handleMint);
  console.log(`[ContactWatcher]: Subscribe to events: Mint`);
}
