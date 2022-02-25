import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import cn from 'classnames';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useQuidContract } from '../../hooks/use-quid-contract';
import { useWallet } from '../../hooks/use-wallet';
import { NotificationContext } from '../Notification/NotificationProvider';
import { Icon } from '../Lib/Icon';
import { useUsdtContract } from '../../hooks/use-usdt-contract';
import { useDebounce } from '../../hooks/use-debounce';
import { numberWithCommas } from '../../utils/number-with-commas';
import { withRetryHandling } from '../../utils/wrap-with-retry-handling';

import styles from './Mint.module.scss';

const waitTransaction = withRetryHandling(
  async (callback: () => Promise<void>) => {
    await callback();
  },
  { baseDelay: 2000, numberOfTries: 30 },
);

const Mint: React.VFC = () => {
  const [mintValue, setMintValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { notify } = useContext(NotificationContext);
  const quidContract = useQuidContract();
  const usdtContract = useUsdtContract();
  const { selectedAccount } = useWallet();
  const [usdtValue, setUsdtValue] = useState(0);
  const [totalSupplyCap, setTotalSupplyCap] = useState(0);
  const [availableValue, setTotalSupply] = useState('');
  const [state, setState] = useState<'none' | 'approving' | 'minting'>('none');

  const getAmounts = async (
    mintValue: string,
  ): Promise<{ qd: BigNumber; usdt: BigNumber }> => {
    const currentTimestamp = (Date.now() / 1000).toFixed(0);
    const qdAmount = parseUnits(mintValue, 24);
    const usdtAmount: BigNumber = await quidContract?.qd_amt_to_usdt_amt(
      qdAmount,
      currentTimestamp,
    );

    return { qd: qdAmount, usdt: usdtAmount };
  };

  useDebounce(
    mintValue,
    async () => {
      if (parseInt(mintValue) > 0) {
        const { usdt } = await getAmounts(mintValue);
        setUsdtValue(parseFloat(formatUnits(usdt, 6)));
      } else {
        setUsdtValue(0);
      }
    },
    500,
  );

  useEffect(() => {
    const updateTotalSupply = () => {
      Promise.all([
        quidContract.get_total_supply_cap(),
        quidContract.totalSupply(),
      ]).then(([totalSupplyCap, totalSupply]) => {
        setTotalSupply(formatUnits(totalSupply, 24));
        setTotalSupplyCap(parseInt(formatUnits(totalSupplyCap, 24)));
      });
    };

    if (quidContract) {
      updateTotalSupply();
    }

    quidContract?.on('Mint', updateTotalSupply);

    return () => {
      quidContract?.removeListener('Mint', updateTotalSupply);
    };
  }, [quidContract]);

  useDebounce(
    mintValue,
    async () => {
      if (parseInt(mintValue) > 0) {
        const { usdt } = await getAmounts(mintValue);
        setUsdtValue(parseFloat(formatUnits(usdt, 6)));
      } else {
        setUsdtValue(0);
      }
    },
    500,
  );

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

    if (Number(originalValue) > Number(availableValue)) {
      originalValue = availableValue;
    }

    if (regex.test(originalValue)) {
      setMintValue(originalValue);
    }
  };

  const handleSetMaxValue = () => {
    if (!selectedAccount) {
      notify({
        message: 'Please connect your wallet',
        severity: 'error',
      });

      return;
    }

    if (mintValue !== availableValue) {
      setMintValue(availableValue);
    }

    if (inputRef) {
      inputRef.current?.focus();
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!mintValue.length) {
      notify({
        severity: 'error',
        message: 'Please enter amount',
      });
      return;
    }

    if (!selectedAccount) {
      notify({
        severity: 'error',
        message: 'Please connect your wallet',
      });
      return;
    }

    try {
      const { qd, usdt } = await getAmounts(mintValue);

      setState('approving');

      const { hash } = await usdtContract?.approve(quidContract?.address, usdt);

      notify({
        severity: 'success',
        message: 'Please wait for approving',
        autoHideDuration: 4500,
      });

      await waitTransaction(async () => {
        const receipt = await quidContract.provider.getTransactionReceipt(hash);

        if (!receipt) {
          throw new Error(`Transaction is not complited!`);
        }
      });

      setState('minting');

      notify({
        severity: 'success',
        message: 'Please check your wallet',
      });

      if (process.env.NEXT_PUBLIC_NETWOKR === 'ropsten') {
        await quidContract?.mint(qd); // because of old version
      } else {
        await quidContract?.mint(qd, selectedAccount);
      }

      notify({
        severity: 'success',
        message: 'Your minting is pending!',
      });
    } catch (err) {
      console.dir(err);
      notify({
        severity: 'error',
        message: (err as Error).message,
        autoHideDuration: 3200,
      });
    } finally {
      setState('none');
      setMintValue('');
    }
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <div>
        <div className={styles.availability}>
          <span className={styles.availabilityTitle}>Available today</span>
          <span className={styles.availabilityCurrent}>
            QD {numberWithCommas(availableValue)}
          </span>
          <span className={styles.availabilityDivideSign}>/</span>
          <span className={styles.availabilityMax}>
            QD {numberWithCommas(totalSupplyCap.toFixed())}
          </span>
        </div>
        <div className={styles.inputContainer}>
          <input
            type="text"
            id="mint-input"
            className={styles.input}
            value={mintValue}
            onChange={handleChangeValue}
            placeholder="Mint amount"
            ref={inputRef}
          />
          <label htmlFor="mint-input" className={styles.dollarSign}>
            QD
          </label>
          <button
            className={styles.maxButton}
            onClick={handleSetMaxValue}
            type="button"
          >
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
            $
            <strong>
              {usdtValue === 0
                ? 'USDT Amount'
                : numberWithCommas(usdtValue.toFixed())}
            </strong>
          </div>
          <div className={styles.subRight}>
            <strong>
              ${numberWithCommas((+mintValue - usdtValue).toFixed())}
            </strong>
            Projected gains
          </div>
        </div>
      </div>
      <button
        type="submit"
        className={cn(styles.submit, styles[state])}
        disabled={state !== 'none'}
      >
        {state !== 'none' ? `...${state}` : 'Mint'}
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
