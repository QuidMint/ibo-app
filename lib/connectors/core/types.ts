import { TypedEventEmitter } from '../../../types';

// per EIP-1193
export interface RequestArguments {
  readonly method: string;
  readonly params?: readonly unknown[] | object;
}

// per EIP-1193
export interface ProviderConnectInfo {
  readonly chainId: string;
}

// per EIP-1193
export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: unknown;
}

interface ProviderEvents {
  connect: (connect: ProviderConnectInfo) => void;
  disconnect: (error: ProviderRpcError) => void;
  chainChanged: (chainId: string) => void;
  accountsChanged: (accounts: string[]) => void;
}

// per EIP-1193
export interface Provider extends TypedEventEmitter<ProviderEvents> {
  request<T extends unknown>(args: RequestArguments): Promise<T>;
}
