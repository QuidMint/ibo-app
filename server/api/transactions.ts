import { Request, Response } from 'express';
import { findAllTransactions } from '../database/queries';

export async function transactionsHandler(req: Request, res: Response) {
  const { limit = 50, offset = 0 } = req.query as any as {
    limit: number;
    offset: number;
  };

  try {
    const response = await findAllTransactions({
      limit,
      offset,
    });

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
