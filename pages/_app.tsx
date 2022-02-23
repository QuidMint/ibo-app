import type { AppProps } from 'next/app';
import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import {
  NotificationList,
  NotificationProvider,
} from '../components/Notification';
import { MetamaskConnector } from '../lib/connectors';
import { useWallet } from '../hooks/use-wallet';
import bootstrap from '../lib/bootstrap';
import { getAccountInfo, getTransactions } from '../services';

import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const { selectedAccount, setConnector } = useWallet();

  bootstrap(); // todo: quick fix

  useEffect(() => {
    if (window.ethereum) {
      setConnector(new MetamaskConnector(window.ethereum));
    }
  }, [setConnector]);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  useEffect(() => {
    if (selectedAccount) {
      getAccountInfo(selectedAccount).then(setUserInfo);
    } else {
      setUserInfo(null);
    }
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
