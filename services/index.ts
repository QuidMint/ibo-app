import { PaginationResponse, Transaction, UserInfoResponse } from '../types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAccountInfo = (address: string): Promise<UserInfoResponse> =>
  fetch(`${API_URL}/account-info?address=${address}`).then((res) => res.json());

export const getTransactions = (): Promise<PaginationResponse<Transaction>> =>
  fetch(`${API_URL}/transactions/?limit=10000&offset=0`).then((res) =>
    res.json(),
  );
