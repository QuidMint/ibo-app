import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import {
  NotificationList,
  NotificationProvider,
} from '../components/Notification';
import { MetamaskConnector } from '../lib/connectors';
import { useWallet } from '../hooks/use-wallet';
import { getAccountInfo, getTransactions } from '../services';
import { createQuidWather } from '../lib/watchers';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const { selectedAccount, setConnector } = useWallet();

  useEffect(() => {
    if (window.ethereum) {
      setConnector(new MetamaskConnector(window.ethereum));
    }
  }, [setConnector]);

  useEffect(() => {
    const fetchData = () => {
      getTransactions().then((response) =>
        setTransactions({
          ...response,
          documents: response.documents.sort(
            (a, b) => +b.value.timestamp - +a.value.timestamp,
          ),
        }),
      );

      if (selectedAccount) {
        getAccountInfo(selectedAccount).then(setUserInfo);
      } else {
        setUserInfo(null);
      }
    };

    const watcher = createQuidWather();

    watcher.on('Mint', fetchData);

    fetchData();
  }, [selectedAccount]);

  return (
    <NotificationProvider>
      <NotificationList />
      <Layout userInfo={userInfo}>
        <Component transactions={transactions} {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
};

export default App;
