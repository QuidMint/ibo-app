export interface TypedEventEmitter<T> {
  on<E extends keyof T>(event: E, listener: T[E]): this;
  removeListener<E extends keyof T>(event: E, listener: T[E]): this;
}

export interface MapEvents {
  [key: string]: (...args: any[]) => void;
}
