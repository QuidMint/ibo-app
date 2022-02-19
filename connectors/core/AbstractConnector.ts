import { Provider } from "./types";

export abstract class AbstractConnector {
    constructor(public readonly provider: Provider) {
        this.provider = provider;
    }

    public abstract isConnected(): Promise<boolean>
    public abstract activate(...args: unknown[]): Promise<{ accounts: string[], chainId: string }>
    public abstract deactivate(...args: unknown[]): Promise<void> | void
}