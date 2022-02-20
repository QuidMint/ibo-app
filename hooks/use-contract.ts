import { useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { abi } from '../contracts/QD.json';
import { useWallet } from './use-wallet';

export const useContract = (contractId: string) => {
  const { provider } = useWallet();

  return useMemo(() => {
    if (provider) {
      const web3Provider = new Web3Provider(provider);

      return new Contract(contractId, abi, web3Provider.getSigner());
    }
  }, [contractId, provider]);
};
