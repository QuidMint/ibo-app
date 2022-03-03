import { Request, Response } from 'express';
import * as queries from '../database/queries';

const quidContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ID as string;

type QueryParams = {
  limit: number;
  offset: number;
  contractAddress: string;
};

export async function transactionsHandler(req: Request, res: Response) {
  const {
    limit = 50,
    offset = 0,
    contractAddress = quidContractAddress,
  } = req.query as unknown as QueryParams;

  try {
    const response = await queries.search({
      limit,
      offset,
      filter: {
        contractAddress,
      },
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
