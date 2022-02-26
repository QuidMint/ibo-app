import Link from 'next/link';
import Image from 'next/image';
import shortedHash from '../../utils/shorted-hash';
import { Icon } from '../Lib/Icon';
import { useWallet } from '../../hooks/use-wallet';
import styles from './Header.module.scss';
import { useContext, useEffect, useState } from 'react';
import { ProviderRpcError } from '../../lib/connectors/core/types';
import { NotificationContext } from '../Notification/NotificationProvider';
import { UserInfoResponse } from '../../types';
import { useUsdtContract } from '../../hooks/use-usdt-contract';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { numberWithCommas } from '../../utils/number-with-commas';

type HeaderProps = {
  userInfo: UserInfoResponse;
};

const Header: React.VFC<HeaderProps> = ({ userInfo }) => {
  const { notify } = useContext(NotificationContext);
  const { selectedAccount, connect } = useWallet();
  const usdtContract = useUsdtContract();
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (selectedAccount) {
      usdtContract?.balanceOf(selectedAccount).then((data: BigNumber) => {
        setBalance(formatUnits(data, 6));
      });
    }
  }, [usdtContract, selectedAccount]);

  const handleWalletConnect = async () => {
    try {
      if (!window.ethereum?.isMetaMask) {
        notify({
          severity: 'error',
          message: 'Metamask is not installed!',
          autoHideDuration: 5500,
        });

        return;
      }

      await connect();
      notify({
        severity: 'success',
        message: 'Your wallet successfully connected',
        autoHideDuration: 5000,
      });
    } catch (err) {
      const error = err as ProviderRpcError;

      if (error.code === 4001) {
        notify({ message: error.message, autoHideDuration: 6000 });
      }
    }
  };

  const summary = (
    <div className={styles.summary}>
      <div className={styles.summaryEl}>
        <div className={styles.summaryElTitle}>Deposited</div>
        <div className={styles.summaryElValue}>
          ${numberWithCommas(userInfo?.costInUsd.toFixed() || '0')}
        </div>
      </div>
      <div className={styles.summaryEl}>
        <div className={styles.summaryElTitle}>My Future QD</div>
        <div className={styles.summaryElValue}>
          {numberWithCommas(userInfo?.qdAmount.toFixed() || '0')}
        </div>
      </div>
      <div className={styles.summaryEl}>
        <div className={styles.summaryElTitle}>Gains</div>
        <div className={styles.summaryElValue}>
          {userInfo?.qdAmount &&
            userInfo?.costInUsd &&
            numberWithCommas(
              `$${(
                Number(userInfo.qdAmount) - Number(userInfo.costInUsd)
              ).toFixed()}`,
            )}
        </div>
      </div>
    </div>
  );

  const balanceBlock = (
    <div className={styles.summaryEl}>
      <div className={styles.summaryElTitle}>USDT balance</div>
      <div className={styles.summaryElValue}>
        ${numberWithCommas(parseInt(balance))}
      </div>
    </div>
  );

  return (
    <header className={styles.root}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <a className={styles.logo} />
        </Link>
      </div>
      {userInfo && summary}
      <div className={styles.walletContainer}>
        {userInfo && balanceBlock}
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
