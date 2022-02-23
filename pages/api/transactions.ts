import { NextApiRequest, NextApiResponse } from 'next';
import { databaseClient } from '../../lib/database';
import { PaginationResponse, Transaction } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { limit = 50, offset = 0 } = req.query as any as {
    limit: number;
    offset: number;
  };

  try {
    await databaseClient.connect();
    const response: PaginationResponse<Transaction> =
      (await databaseClient.findAll('idx1:transactions', '*', {
        LIMIT: {
          from: offset,
          size: limit,
        },
      })) as unknown as PaginationResponse<Transaction>;

    await databaseClient.close();
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
