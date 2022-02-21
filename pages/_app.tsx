import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import {
  NotificationList,
  NotificationProvider,
} from '../components/Notification';
import { MetamaskConnector } from '../lib/connectors';
import { useWallet } from '../hooks/use-wallet';
import { init } from '../lib/startup';

import '../styles/globals.css';

init();

const App = ({ Component, pageProps }: AppProps) => {
  const { setConnector } = useWallet();

  useEffect(() => {
    if (window.ethereum) {
      setConnector(new MetamaskConnector(window.ethereum));
    }
  }, [setConnector]);

  return (
    <NotificationProvider>
      <NotificationList />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </NotificationProvider>
  );
};

export default App;
