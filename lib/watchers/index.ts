import { BigNumber } from '@ethersproject/bignumber';
import { ContractWatcher } from '../../lib/contracts/ContractWatcher';
import contractJson from '../../lib/contracts/QD.json';
import { webSocketProvider } from '../../lib/providers';

export type EventData = { blockHash: string; transactionHash: string };

export type WatcherMap = {
  Mint: (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    data: EventData,
  ) => void;
};

export const createQuidWather = () => {
  return new ContractWatcher<WatcherMap>(
    process.env.NEXT_PUBLIC_CONTRACT_ID!,
    contractJson.abi,
    webSocketProvider,
  );
};
