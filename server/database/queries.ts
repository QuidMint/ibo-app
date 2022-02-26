import { databaseClient } from './client';
import { PaginationResponse, Transaction } from '../../types';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ID;

type TransactionQuery = {
  limit?: number;
  offset?: number;
  address?: string | undefined;
};

export const findAllTransactions = async ({
  limit = 100000, // todo: temporary
  offset = 0,
  address,
}: TransactionQuery) => {
  const response = await databaseClient.findAll(
    'idx:transactions',
    address
      ? `@address:{${address}} @contractAddress:{${contractAddress}} SORTBY timestamp DESC`
      : `@contractAddress:{${contractAddress}} SORTBY timestamp DESC`,
    { LIMIT: { from: offset, size: limit } },
  );

  return response as PaginationResponse<Transaction>;
};

export const getAccountInfo = async (
  address: string,
): Promise<{ costInUsd: number; qdAmount: number; address: string }> => {
  const response = await findAllTransactions({ address });

  let costInUsd = 0;
  let qdAmount = 0;

  response.documents.map((item) => {
    costInUsd += parseFloat(item.value.costInUsd);
    qdAmount += parseFloat(item.value.qdAmount);
  });

  return { costInUsd, qdAmount, address };
};

export const getTransaction = (hash: string): Promise<Transaction> => {
  return databaseClient.get<Transaction>(`transactions:${hash}`);
};
