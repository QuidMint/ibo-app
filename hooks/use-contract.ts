import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useWallet } from './use-wallet';
import { getNetwork } from '@ethersproject/providers';
import { defaultProvider } from '../lib/contracts';

const network = getNetwork(process.env.NEXT_PUBLIC_NETWOKR || 'ropsten');

export const useContract = (contractId: string, abi: ContractInterface) => {
  const { provider, selectedAccount, chainId } = useWallet();

  return useMemo(() => {
    let signerOrProvider: any = selectedAccount
      ? provider?.getSigner()
      : provider;

    if (chainId && parseInt(chainId, 16) !== network.chainId) {
      signerOrProvider = defaultProvider;
    }

    return new Contract(contractId, abi, signerOrProvider || defaultProvider);
  }, [abi, chainId, contractId, provider, selectedAccount]);
};
