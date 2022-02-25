import { Signer } from '@ethersproject/abstract-signer';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';
import contractJson from '../../lib/contracts/QD.json';
import { InfuraProvider } from '@ethersproject/providers';
import { withRetryHandling } from '../../utils/wrap-with-retry-handling';

export const defaultProvider = new InfuraProvider(
  process.env.NEXT_PUBLIC_NETWOKR,
  process.env.NEXT_PUBLIC_INFURA_KEY || '',
);

export const createQuidContract = (
  signerOrProvider: Provider | Signer = defaultProvider,
) => {
  return new Contract(
    process.env.NEXT_PUBLIC_CONTRACT_ID!,
    contractJson.abi,
    signerOrProvider,
  );
};

export const waitTransaction = withRetryHandling(
  async (hash: string) => {
    const receipt = await defaultProvider.getTransactionReceipt(hash);

    if (!receipt) {
      throw new Error(`Transaction is not complited!`);
    }
  },
  { baseDelay: 2000, numberOfTries: 30 },
);
