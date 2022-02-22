import { Web3Provider } from '@ethersproject/providers';
import { useCallback, useEffect, useState } from 'react';
import { AbstractConnector } from '../lib/connectors';
import {
  ProviderConnectInfo,
  ProviderRpcError,
} from '../lib/connectors/core/types';

let currentConnector: AbstractConnector | null = null;
let provider: Web3Provider | null = null;

type WalletState = {
  isActivating: boolean;
  accounts: string[];
  chainId: string | null;
  error: Error | ProviderRpcError | null;
  connector: AbstractConnector | null;
};

export const useWallet = () => {
  const [state, setState] = useState<WalletState>({
    isActivating: false,
    accounts: [],
    chainId: null,
    error: null,
    connector: currentConnector,
  });

  const connector = currentConnector;

  const updateState = useCallback(
    (partialState: Partial<WalletState>) => {
      return setState((prevState) => ({ ...prevState, ...partialState }));
    },
    [setState],
  );

  const connect = useCallback(async (): Promise<void> => {
    if (!connector) {
      throw new Error(
        '[UseWallet]: Connector is not defined! Please define connector before using connect!',
      );
    }

    updateState({ isActivating: true });

    const { chainId, accounts } = await connector.activate();

    updateState({ chainId, accounts, isActivating: false });
  }, [connector, updateState]);

  useEffect(() => {
    if (!connector) {
      return;
    }

    const handleConnect = ({ chainId }: ProviderConnectInfo) => {
      updateState({ chainId });
    };

    const handleDisconnect = (error: ProviderRpcError) => {
      updateState({ error });
    };

    const handleChainChanged = (chainId: string) => {
      updateState({ chainId });
    };

    const handleAccountsChanged = (accounts: string[]) => {
      updateState({ accounts });
    };

    connector.provider.on('connect', handleConnect);
    connector.provider.on('disconnect', handleDisconnect);
    connector.provider.on('chainChanged', handleChainChanged);
    connector.provider.on('accountsChanged', handleAccountsChanged);

    connector.isConnected().then((isConnected) => {
      isConnected && connect();
    });

    return () => {
      connector.provider.removeListener('connect', handleConnect);
      connector.provider.removeListener('disconnect', handleDisconnect);
      connector.provider.removeListener('chainChanged', handleChainChanged);
      connector.provider.removeListener(
        'accountsChanged',
        handleAccountsChanged,
      );
    };
  }, [connect, connector, updateState]);

  const setNewConnector = useCallback(
    (connector: AbstractConnector) => {
      updateState({
        connector,
      });
      currentConnector = connector;
      provider = new Web3Provider(connector.provider);
    },
    [updateState],
  );

  return {
    ...state,
    selectedAccount: state.accounts[0] || null,
    provider,
    connect,
    setConnector: setNewConnector,
  };
};
