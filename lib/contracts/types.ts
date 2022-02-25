import { BigNumber } from '@ethersproject/bignumber';

export type EventData = { blockHash: string; transactionHash: string };

export type WatcherMap = {
  Mint: (
    address: string,
    costInUsd: BigNumber,
    qdAmount: BigNumber,
    data: EventData,
  ) => void;
};
