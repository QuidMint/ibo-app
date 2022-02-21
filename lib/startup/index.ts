import { BigNumber } from '@ethersproject/bignumber';
import { ContractWatcher } from '../contracts/ContractWatcher';
import { webSocketProvider } from '../providers';
import contractJson from '../contracts/QD.json';

type QuidEvents = {
  Mint: (address: string, costInUsd: BigNumber, qdAmount: BigNumber) => void;
};

export const init = () => {
  const quidWatcher = new ContractWatcher<QuidEvents>(
    process.env.NEXT_PUBLIC_CONTRACT_ID!,
    contractJson.abi,
    webSocketProvider,
  );

  quidWatcher.on(
    'Mint',
    (address: string, costInUsd: BigNumber, qdAmount: BigNumber) => {
      console.log('mint: ', address, costInUsd.toNumber(), qdAmount.toNumber());
    },
  );
};
