import Link from 'next/link';
import Image from 'next/image';
import shortedHash from '../../utils/shorted-hash';
import { Icon } from '../Lib/Icon';
import { useWallet } from '../../hooks/use-wallet';
import styles from './Header.module.scss';
import { useState } from 'react';

const Header: React.VFC = () => {
  const { selectedAccount, connect } = useWallet();
  const [error, setError] = useState<string | null>(null);

  const handleWalletConnect = async () => {
    try {
      connect();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <header className={styles.root}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo} />
        </Link>
      </div>
      {/* <div className={styles.summary}>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Deposited</div>
          <div className={styles.summaryElValue}>$20,000</div>
        </div>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>My Future QD</div>
          <div className={styles.summaryElValue}>$20,000</div>
        </div>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Gains</div>
          <div className={styles.summaryElValue}>$452,571</div>
        </div>
      </div> */}
      <div className={styles.walletContainer}>
        {/* <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>USDT balance</div>
          <div className={styles.summaryElValue}>$452,571</div>
        </div> */}
        {selectedAccount ? (
          <div className={styles.wallet}>
            <div className={styles.metamaskIcon}>
              <Image
                width="18"
                height="18"
                src="/images/metamask.svg"
                alt="metamask"
              />
            </div>
            {shortedHash(selectedAccount)}
            <Icon name="btn-bg" className={styles.walletBackground} />
          </div>
        ) : (
          <button className={styles.wallet} onClick={handleWalletConnect}>
            Connect Metamask
            <Icon name="btn-bg" className={styles.walletBackground} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
