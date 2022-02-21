declare type Provider = import('./lib/connectors/core/types').Provider;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Window {
  ethereum?: Provider;
}
