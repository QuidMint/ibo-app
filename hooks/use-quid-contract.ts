import { useContract } from './use-contract';
import contractJson from '../lib/contracts/QD.json';

export const useQuidContract = () => {
  return useContract(process.env.NEXT_PUBLIC_CONTRACT_ID!, contractJson.abi);
};
