import { Request, Response } from 'express';
import { getAccountInfo } from '../database/queries';

export async function accountInfoHandler(req: Request, res: Response) {
  const { address } = req.query as { address: string };

  try {
    if (typeof address === 'undefined') {
      return res.status(400).json({ message: 'Address is required!' });
    }

    const accountInfo = await getAccountInfo(address);

    res.status(200).json(accountInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
