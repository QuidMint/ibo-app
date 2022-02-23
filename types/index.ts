export interface TypedEventEmitter<T> {
  on<E extends keyof T>(event: E, listener: T[E]): this;
  removeListener<E extends keyof T>(event: E, listener: T[E]): this;
}

export interface MapEvents {
  [key: string]: (...args: any[]) => void;
}

export type Transaction = {
  transactionHash: string;
  address: string;
  costInUsd: string;
  qdAmount: string;
  timestamp: string;
};

export type PaginationResponse<T> = {
  total: number;
  documents: Array<{
    id: string;
    value: T;
  }>;
};

export type UserInfoResponse = {
  address: string;
  costInUsd: number;
  qdAmount: number;
}
