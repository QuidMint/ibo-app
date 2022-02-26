import { BigNumber } from '@ethersproject/bignumber';
import { databaseClient } from '../database';
import { formatUnits } from '@ethersproject/units';
import { createQuidContract } from '../../lib/contracts';
import { EventData } from '../../lib/contracts/types';

export async function runWatchers() {
  const watcher = createQuidContract();
  console.log(`[ContactWatcher]: Start watching: ${watcher.address}`);

  const handleMint = async (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    { blockHash, transactionHash }: EventData,
  ) => {
    console.log(
      `[ContactWatcher - ${transactionHash}]: Start processing event`,
    );

    try {
      const block = await watcher.provider.getBlock(blockHash);
      const transactionData = {
        transactionHash,
        address,
        costInUsd: formatUnits(costInUsd, 6),
        qdAmount: formatUnits(qdAmount, 24),
        timestamp: block.timestamp,
      };

      console.log(
        `[ContactWatcher - ${transactionHash}]: ${JSON.stringify(
          transactionData,
        )}`,
      );

      const result = await databaseClient.save(
        `transactions:${transactionHash}`,
        transactionData,
      );

      console.log(
        `[ContactWatcher - ${transactionHash}]: Save transaction hash`,
      );

      await databaseClient.save('lastTransactionHash', transactionHash);

      console.log(
        `[ContactWatcher - ${transactionHash}]: Event successfuly savated to database`,
        result,
      );
    } catch (err) {
      console.error(err);
    }
  };

  watcher.on('Mint', handleMint);
  console.log(`[ContactWatcher]: Subscribe to events: Mint`);
}
