import { BigNumber } from '@ethersproject/bignumber';
import { ContractWatcher } from '../../lib/contracts/ContractWatcher';
import contractJson from '../../lib/contracts/QD.json';
import { databaseClient } from '../database';
import { formatUnits } from '@ethersproject/units';
import { webSocketProvider } from '../../lib/providers';

type EventData = { blockHash: string; transactionHash: string };

type WatcherMap = {
  Mint: (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    data: EventData,
  ) => void;
};

const createWather = () => {
  return new ContractWatcher<WatcherMap>(
    process.env.NEXT_PUBLIC_CONTRACT_ID!,
    contractJson.abi,
    webSocketProvider,
  );
};

export async function runWatchers() {
  console.log('[ContactWatcher]: Start watching');

  const watcher = createWather();

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
  console.log(`[ContactWatcher]: Subscribe to events`);
}
