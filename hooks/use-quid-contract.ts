import { useContract } from './use-contract';

export const useQuidContract = () => {
  return useContract(process.env.NEXT_PUBLIC_CONTRACT_ID!);
};
