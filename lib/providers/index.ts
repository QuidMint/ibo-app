import { JsonRpcProvider, WebSocketProvider } from '@ethersproject/providers';

export const webSocketProvider = new WebSocketProvider(
  process.env.NEXT_PUBLIC_INFURA_RPC || '',
);

export const jsonRpcProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_INFURA_RPC || '',
);
