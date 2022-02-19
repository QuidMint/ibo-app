import { ChangeEvent, useState } from 'react';
import { Icon } from '../Lib/Icon';
import styles from './Mint.module.scss';

const Mint: React.VFC = () => {
  const [value, setValue] = useState("");

  const handleChangeValue = (e: ChangeEvent<HTMLInputElement>) => {
    const regex = /^\d*(\.\d*)?$|^$/;
    let originalValue = e.target.value;

    if (originalValue.length > 1 && originalValue[0] === '0' && originalValue[1] !== '.') {
      originalValue = originalValue.substring(1);
    }

    if (originalValue[0] === '.') {
      originalValue = '0' + originalValue;
    }

    if (regex.test(originalValue)) {
      setValue(originalValue);
    }
  }

  return (
    <form className={styles.root}>
      <div>
        <div className={styles.availability}>
          <span className={styles.availabilityTitle}>
            Available today
          </span>
          <span className={styles.availabilityCurrent}>
            $45,000.34
          </span>
          <span className={styles.availabilityDivideSign}>
            /
          </span>
          <span className={styles.availabilityMax}>
            $514,000.00
          </span>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="mint-input" className={styles.dollarSign}>$</label>
          <input type="text" id="mint-input" className={styles.input} value={value} onChange={handleChangeValue} placeholder="Deposit amount" />
          <button className={styles.maxButton}>
            Max
            <Icon preserveAspectRatio="none" className={styles.maxButtonBackground} name="btn-bg" />
          </button>
        </div>
        <div className={styles.sub}>
          <div className={styles.subLeft}>
            QD
            <strong>
              345
            </strong>
          </div>
          <div className={styles.subRight}>
            <strong>
              $34,456
            </strong>
            Projected gains
          </div>
        </div>
      </div>
      <button type="submit" className={styles.submit}>
        Mint
        <Icon preserveAspectRatio="none" className={styles.submitBtnL1} name="composite-btn-l1" />
        <Icon preserveAspectRatio="none" className={styles.submitBtnL2} name="composite-btn-l2" />
        <Icon preserveAspectRatio="none" className={styles.submitBtnL3} name="composite-btn-l3" />
      </button>
    </form>
  );
};

export default Mint;
