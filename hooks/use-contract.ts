import { useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useWallet } from './use-wallet';

export const useContract = (contractId: string, abi: ContractInterface) => {
  const { provider } = useWallet();

  return useMemo(() => {
    if (provider) {
      const web3Provider = new Web3Provider(provider);

      return new Contract(contractId, abi, web3Provider.getSigner());
    }
  }, [abi, contractId, provider]);
};
