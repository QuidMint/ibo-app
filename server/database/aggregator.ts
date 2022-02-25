// import { databaseClient } from './client';
// import { Transaction } from '../../types';
// import { findAllTransactions } from './queries';
// import { jsonRpcProvider } from '../../lib/providers';

export const runAggregation = async () => {
  console.log('[Aggregator]: Start Aggregation');

  // const lastTransactionHash = await databaseClient.get<string | undefined>(
  //   'lastTransactionHash',
  // );

  // let lastTransaction: Transaction;

  // if (lastTransactionHash) {
  //   lastTransaction = await databaseClient.get(lastTransactionHash);
  // } else {
  //   const { documents } = await findAllTransactions({ limit: 1 });

  //   lastTransaction = documents[0].value;
  // }

  // if (!lastTransaction) {
  //   console.log('[Aggregator]: Skip Aggregation');
  // }

  // jsonRpcProvider;
};
