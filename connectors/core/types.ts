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

export interface TypedEventEmitter {
  on<E extends keyof ProviderEvents>(
    event: E,
    listener: ProviderEvents[E],
  ): this;
  removeListener<E extends keyof ProviderEvents>(
    event: E,
    listener: ProviderEvents[E],
  ): this;
}

// per EIP-1193
export interface Provider extends TypedEventEmitter {
  request<T extends unknown>(args: RequestArguments): Promise<T>;
}
