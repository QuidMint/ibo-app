import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { Layout } from '../components/Layout';
import { MetamaskConnector } from '../connectors';
import { useWallet } from '../hooks/use-wallet';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { setConnector } = useWallet();

  useEffect(() => {
    if (window.ethereum) {
      setConnector(new MetamaskConnector(window.ethereum));
    }
  }, [setConnector]);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
