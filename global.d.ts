declare type Provider = import('./lib/connectors/core/types').Provider;

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

declare global {
  let isBootstrapped: boolean;
}

interface Window {
  ethereum?: Provider & { isMetaMask?: boolean };
}
