import Link from 'next/link';
import styles from './Header.module.scss';

const Header: React.VFC = () => {
  return (
    <header className={styles.root}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo} />
        </Link>
      </div>
      <div className={styles.summary}>
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
      </div>
      <div className={styles.walletContainer}>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>USDT balance</div>
          <div className={styles.summaryElValue}>$452,571</div>
        </div>
        <button className={styles.connectWallet}>Connect Metamask</button>
      </div>
    </header>
  );
};

export default Header;
