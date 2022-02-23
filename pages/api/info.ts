import { NextApiRequest, NextApiResponse } from 'next';
import { databaseClient } from '../../lib/database';
import { PaginationResponse, Transaction } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  try {
    await databaseClient.connect();
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);

    const startTimestamp = (start.getTime() / 1000).toFixed();
    const endTimestamp = (end.getTime() / 1000).toFixed();

    const response: PaginationResponse<Transaction> =
      (await databaseClient.findAll(
        'idx1:transactions',
        `@timestamp:[${startTimestamp} ${endTimestamp}]`,
      )) as unknown as PaginationResponse<Transaction>;

    let depositedToday = 0;

    response.documents.map((item) => {
      depositedToday += parseFloat(item.value.costInUsd);
    });

    res.status(200).json({ depositedToday });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
