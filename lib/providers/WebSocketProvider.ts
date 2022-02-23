import { WebSocketProvider } from '@ethersproject/providers';

export const webSocketProvider = new WebSocketProvider(
  process.env.NEXT_PUBLIC_INFURA_RPC || '',
);
