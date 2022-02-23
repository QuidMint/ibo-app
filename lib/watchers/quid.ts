import { BigNumber } from '@ethersproject/bignumber';
import { ContractWatcher } from '../contracts/ContractWatcher';
import { webSocketProvider } from '../providers';
import contractJson from '../contracts/QD.json';
import { databaseClient } from '../database';
import { formatUnits } from '@ethersproject/units';

type EventData = { blockHash: string; transactionHash: string };

type QuidEvents = {
  Mint: (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    data: EventData,
  ) => void;
};

export async function run() {
  const quidWatcher = new ContractWatcher<QuidEvents>(
    process.env.NEXT_PUBLIC_CONTRACT_ID!,
    contractJson.abi,
    webSocketProvider,
  );

  const handleMint = async (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    { blockHash, transactionHash }: EventData,
  ) => {
    try {
      console.log(
        `[Contact Event]: mint - ${address} ${formatUnits(
          costInUsd,
          6,
        )} ${formatUnits(qdAmount, 24)}`,
      );
      const block = await webSocketProvider.getBlock(blockHash);

      const result = await databaseClient.save(
        `transactions:${transactionHash}`,
        {
          transactionHash,
          address,
          costInUsd: formatUnits(costInUsd, 6),
          qdAmount: formatUnits(qdAmount, 24),
          timestamp: block.timestamp,
        },
      );

      console.log('Transaction successfuly savated to database: ', result);
    } catch (err) {
      console.error(err);
    }
  };

  quidWatcher.on('Mint', handleMint);
}
