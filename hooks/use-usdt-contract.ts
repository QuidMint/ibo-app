import { useContract } from './use-contract';
import contractJson from '../lib/contracts/ERC20.json';

export const useUsdtContract = () => {
  return useContract(
    process.env.NEXT_PUBLIC_USDT_CONTRACT_ID!,
    contractJson.abi,
  );
};
