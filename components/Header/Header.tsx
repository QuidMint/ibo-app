import type { NextPage } from 'next';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header: NextPage = () => {
  return (
    <header className={styles.root}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo} />
        </Link>
      </div>
      <div className={styles.summary}>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Days left</div>
          <div className={styles.summaryElValue}>34</div>
        </div>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Your total mint</div>
          <div className={styles.summaryElValue}>$20,000</div>
        </div>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Gains</div>
          <div className={styles.summaryElValue}>$452,571</div>
        </div>
      </div>
      <div className={styles.walletContainer}>
        <div className={styles.summaryEl}>
          <div className={styles.summaryElTitle}>Wallet balance</div>
          <div className={styles.summaryElValue}>$452,571</div>
        </div>
        <button className={styles.wallet}>Connect Metamask</button>
      </div>
    </header>
  );
};

export default Header;
