import { useEffect, useMemo } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { formatUnits } from '@ethersproject/units';
import { Provider } from '../connectors/core/types';
import { abi } from '../contracts/QD.json';

export const useContract = (provider: Provider | null) => {
    return useMemo(() => provider ? new Contract(
        '0x91dE90CA97b5410A5635F6713bD497493968e748',
        abi,
        new Web3Provider(provider)
    ) : null, [provider]);
}