import { databaseClient } from './client';
import { PaginationResponse, Transaction } from '../../types';

type TransactionQuery = {
  limit?: number;
  offset?: number;
  filter?: Partial<Transaction>;
};

export const search = async ({
  limit = 50,
  offset = 0,
  filter = {},
}: TransactionQuery) => {
  const srtFilter = Object.keys(filter).reduce(
    (result: string, key: string) => {
      if (filter[key as keyof Transaction]) {
        result += `@${key}:{${filter[key as keyof Transaction]}}`;
      }

      return result;
    },
    '',
  );

  const response = await databaseClient.findAll(
    'idx2:transactions',
    srtFilter,
    {
      LIMIT: { from: offset, size: limit },
      SORTBY: {
        //@ts-ignore
        BY: 'timestamp',
        DIRECTION: 'DESC',
      },
    },
  );

  return response as PaginationResponse<Transaction>;
};

export const getAccountInfo = async (
  address: string,
  contractAddress: string,
): Promise<{ costInUsd: number; qdAmount: number; address: string }> => {
  const response = await search({ filter: { address, contractAddress } });

  let costInUsd = 0;
  let qdAmount = 0;

  response.documents.map((item) => {
    costInUsd += parseFloat(item.value.costInUsd);
    qdAmount += parseFloat(item.value.qdAmount);
  });

  return { costInUsd, qdAmount, address };
};
