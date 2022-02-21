import { Contract, ContractInterface } from '@ethersproject/contracts';
import { WebSocketProvider } from '@ethersproject/providers';
import { MapEvents } from '../../types';

export class ContractWatcher<T extends MapEvents> {
  private readonly contract: Contract;

  constructor(
    address: string,
    abi: ContractInterface,
    webSocketProvider: WebSocketProvider,
  ) {
    this.contract = new Contract(address, abi, webSocketProvider);
  }

  getContract(): Contract {
    return this.contract;
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
