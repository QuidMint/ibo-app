import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useWallet } from '../hooks/use-wallet';

import styles from '../styles/Home.module.scss'
import { MetamaskConnector } from '../connectors';
import { useContract } from '../hooks/use-contract';

const Test: NextPage = () => {
  const [error, setError] = useState<string | null>(null);
  const { selectedAccount, chainId, connect, setConnector, provider } = useWallet();
  const contract = useContract(provider);

  useEffect(() => {
    if (window.ethereum) {
      setConnector(new MetamaskConnector(window.ethereum))
    }
  }, [setConnector]);

  const handleWalletConnect = async () => {
    try { 
      connect();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  useEffect(() => {
    console.log('call contract');

    contract?.get_total_supply_cap()
        .then((result: any) =>
            console.log('get_total_supply_cap: ', formatUnits(result, 18))
        );

    contract?.qd_amount_to_usdt_amount(10, Date.now()).then((result: any) =>
        console.log('qd_amount_to_usdt_amount: ', formatUnits(result, 18))
    );
    
}, []);

  return (
    <div className={styles.root}>
      <Head>
        <title>QUID</title>
        <meta name="description" content="quid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a className={styles.logo} />
          </Link>
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Days left
            </div>
            <div className={styles.summaryElValue}>
              34
            </div>
          </div>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Your total mint
            </div>
            <div className={styles.summaryElValue}>
              $20,000
            </div>
          </div>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Gains
            </div>
            <div className={styles.summaryElValue}>
              $452,571
            </div>
          </div>
        </div>
        <div className={styles.walletContainer}>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Wallet balance
            </div>
            <div className={styles.summaryElValue}>
              $452,571
            </div>
          </div>
          <button className={styles.wallet} onClick={handleWalletConnect}>
            { selectedAccount ? selectedAccount : 'Connect Metamask' } <br />
            chainId: { chainId }
          </button>
        </div>
      </header>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        <button>Music is on</button>
        <button>Scroll</button>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </footer>
    </div>
  )
}

export default Test;
