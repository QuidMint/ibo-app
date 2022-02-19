import Link from 'next/link';
import Image from 'next/image';
import shortedHash from '../../utils/shorted-hash';
import styles from './Header.module.scss';

const WALLET_HASH = '0x56m40000003mju';

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
        <button className={styles.wallet}>Connect Metamask</button>
        <button className={styles.wallet}>
          {WALLET_HASH ? (
            <div className={styles.metamaskIcon}>
              <Image
                width="18"
                height="18"
                src="/images/metamask.svg"
                alt="metamask"
              />
            </div>
          ) : null}
          {shortedHash(WALLET_HASH)}
        </button>
      </div>
    </header>
  );
};

export default Header;
