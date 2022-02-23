import { NextApiRequest, NextApiResponse } from 'next';
import { databaseClient } from '../../lib/database';
import { PaginationResponse, Transaction } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { address } = req.query as { address: string };

  try {
    if (!address) {
      res.status(400).json({ message: 'Address is required!' });
    }

    await databaseClient.connect();
    const response: PaginationResponse<Transaction> =
      (await databaseClient.findAll(
        'idx1:transactions',
        `@address:{${address}}`,
      )) as unknown as PaginationResponse<Transaction>;

    let costInUsd = 0;
    let qdAmount = 0;

    response.documents.map((item) => {
      costInUsd += parseFloat(item.value.costInUsd);
      qdAmount += parseFloat(item.value.qdAmount);
    });

    await databaseClient.close();
    res.status(200).json({ address, costInUsd, qdAmount });
  } catch (err) {
    console.error(err);
  }
}
