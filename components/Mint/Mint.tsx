import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useContract } from '../../hooks/use-contract';
import { Icon } from '../Lib/Icon';
import styles from './Mint.module.scss';

const MAX_VALUE = '45000.34';

const Mint: React.VFC = () => {
  const [mintValue, setMintValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const contract = useContract();

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

    if (Number(originalValue) > Number(MAX_VALUE)) {
      originalValue = MAX_VALUE;
    }

    if (regex.test(originalValue)) {
      setMintValue(originalValue);
    }
  };

  const handleSetMaxValue = () => {
    if (mintValue !== MAX_VALUE) {
      setMintValue(MAX_VALUE);
    }

    if (inputRef) {
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // contract?.mint(mintValue, 0);
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
            ref={inputRef}
          />
          <button className={styles.maxButton} onClick={handleSetMaxValue}>
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
