import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useWallet } from './use-wallet';

export const useContract = (contractId: string, abi: ContractInterface) => {
  const { provider, selectedAccount } = useWallet();

  return useMemo(() => {
    if (provider) {
      return new Contract(
        contractId,
        abi,
        selectedAccount ? provider.getSigner() : provider,
      );
    }
  }, [abi, contractId, provider, selectedAccount]);
};
