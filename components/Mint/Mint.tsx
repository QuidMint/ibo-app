import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { formatUnits } from '@ethersproject/units';
import { useQuidContract } from '../../hooks/use-quid-contract';
import { useWallet } from '../../hooks/use-wallet';
import { NotificationContext } from '../Notification/NotificationProvider';
import { Icon } from '../Lib/Icon';

import styles from './Mint.module.scss';

const Mint: React.VFC = () => {
  const [mintValue, setMintValue] = useState('');
  const { notify } = useContext(NotificationContext);
  const contract = useQuidContract();
  const { selectedAccount, connect } = useWallet();

  useEffect(() => {
    const fetch = async () => {
      if (!contract) return;

      const result = await contract.get_total_supply_cap();
      const result1 = await contract.qd_amount_to_usdt_amount(
        result,
        1645369111,
      );

      console.log('get_total_supply_cap: ', formatUnits(result1, 18));
    };

    fetch();
  }, [contract]);

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d*(\.\d*)?$|^$/;
    let originalValue = e.target.value;

    if (
      originalValue.length > 1 &&
      originalValue[0] === '0' &&
      originalValue[1] !== '.'
    ) {
      originalValue = originalValue.substring(1);
    }

    if (originalValue[0] === '.') {
      originalValue = '0' + originalValue;
    }

    if (regex.test(originalValue)) {
      setMintValue(originalValue);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedAccount) {
      notify({
        severity: 'error',
        message: 'Please connect your wallet',
      });
      return;
    }

    try {
      await contract?.mint(mintValue);
    } catch (err) {
      notify({
        severity: 'error',
        message: (err as Error).message,
        autoHideDuration: 3200,
      });
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div>
        <div className={styles.availability}>
          <span className={styles.availabilityTitle}>Available today</span>
          <span className={styles.availabilityCurrent}>$45,000.34</span>
          <span className={styles.availabilityDivideSign}>/</span>
          <span className={styles.availabilityMax}>$514,000.00</span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="mint-input" className={styles.dollarSign}>
            $
          </label>
          <input
            type="text"
            id="mint-input"
            className={styles.input}
            value={mintValue}
            onChange={handleChangeValue}
            placeholder="Deposit amount"
          />
          <button className={styles.maxButton}>
            Max
            <Icon
              preserveAspectRatio="none"
              className={styles.maxButtonBackground}
              name="btn-bg"
            />
          </button>
        </div>
        <div className={styles.sub}>
          <div className={styles.subLeft}>
            QD
            <strong>345</strong>
          </div>
          <div className={styles.subRight}>
            <strong>$34,456</strong>
            Projected gains
          </div>
        </div>
      </div>
      <button type="submit" className={styles.submit}>
        Mint
        <Icon
          preserveAspectRatio="none"
          className={styles.submitBtnL1}
          name="composite-btn-l1"
        />
        <Icon
          preserveAspectRatio="none"
          className={styles.submitBtnL2}
          name="composite-btn-l2"
        />
        <Icon
          preserveAspectRatio="none"
          className={styles.submitBtnL3}
          name="composite-btn-l3"
        />
        <div className={styles.glowEffect} />
      </button>
    </form>
  );
};

export default Mint;
