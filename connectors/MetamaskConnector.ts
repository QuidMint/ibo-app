import { AbstractConnector } from "./core/AbstractConnector";

export class MetamaskConnector extends AbstractConnector {
    public async isConnected(): Promise<boolean> {
        const accounts = await this.provider.request<string[]>({
            method: 'eth_accounts'
        });

        return accounts.length !== 0;
    }

    public async activate(): Promise<{ accounts: string[], chainId: string }> {
        console.log('[MetaMask]: Start MetaMask connection!');

        try {
            const accountsPromise = this.provider.request<string[]>({
                method: 'eth_requestAccounts'
            });
            const chainIdPromise = this.provider.request<string>({ method: 'eth_chainId' });

            const [accounts, chainId] = await Promise.all([accountsPromise, chainIdPromise]);

            return { accounts, chainId };

        } catch (err: any) {
            if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('[MetaMask]: Please connect to MetaMask.');
            }

            throw err;
        }

    }

    public async deactivate(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}