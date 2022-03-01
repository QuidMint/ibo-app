import { Request, Response } from 'express';
import { getAccountInfo } from '../database/queries';

type QueryParams = {
  address: string;
  contractAddress: string;
};

const quidContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ID as string;

export async function accountInfoHandler(req: Request, res: Response) {
  const { address, contractAddress = quidContractAddress } =
    req.query as QueryParams;

  try {
    if (typeof address === 'undefined') {
      return res.status(400).json({ message: 'Address is required!' });
    }

    const accountInfo = await getAccountInfo(address, contractAddress);

    res.status(200).json(accountInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Somethings went wrong!' });
  }
}
