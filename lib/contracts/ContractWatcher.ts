import { Contract, ContractInterface } from '@ethersproject/contracts';
import { WebSocketProvider } from '@ethersproject/providers';
import { MapEvents } from '../../types';

export class ContractWatcher<T extends MapEvents> {
  public readonly contract: Contract;
  public readonly provider: WebSocketProvider;

  constructor(
    address: string,
    abi: ContractInterface,
    webSocketProvider: WebSocketProvider,
  ) {
    this.provider = webSocketProvider;
    this.contract = new Contract(address, abi, webSocketProvider);
  }

  on<E extends keyof T>(event: E, listener: T[E]): this {
    this.contract.on(event as string, listener);
    return this;
  }

  removeListener<E extends keyof T>(event: E, listener: T[E]): this {
    this.contract.removeListener(event as string, listener);

    return this;
  }
}
