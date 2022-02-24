import {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useQuidContract } from '../../hooks/use-quid-contract';
import { useWallet } from '../../hooks/use-wallet';
import { NotificationContext } from '../Notification/NotificationProvider';
import { Icon } from '../Lib/Icon';
import { useUsdtContract } from '../../hooks/use-usdt-contract';

import styles from './Mint.module.scss';
import { useDebounce } from '../../hooks/use-debounce';
import { numberWithCommas } from '../../utils/number-with-commas';
import { withRetryHandling } from '../../utils/wrap-with-retry-handling';

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
  const contract = useQuidContract();
  const usdtContract = useUsdtContract();
  const { selectedAccount } = useWallet();
  const [usdtValue, setUsdtValue] = useState(0);
  const [totalSupplyCap, setTotalSupplyCap] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [state, setState] = useState<'none' | 'approving' | 'minting'>('none');

  const getAmounts = async (
    mintValue: string,
  ): Promise<{ qd: BigNumber; usdt: BigNumber }> => {
    const currentTimestamp = (Date.now() / 1000).toFixed(0);
    const qdAmount = parseUnits(mintValue, 24);
    const usdtAmount: BigNumber = await contract?.qd_amt_to_usdt_amt(
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
    let timerId: NodeJS.Timer;

    if (contract) {
      const updateTotalSupply = () => {
        Promise.all([
          contract.get_total_supply_cap(),
          contract.totalSupply(),
        ]).then(([totalSupplyCap, totalSupply]) => {
          setTotalSupply(parseInt(formatUnits(totalSupply, 24)));
          setTotalSupplyCap(parseInt(formatUnits(totalSupplyCap, 24)));
        });
      };

      timerId = setInterval(updateTotalSupply, 60000);
      updateTotalSupply();
    }
    return () => timerId && clearInterval(timerId);
  }, [contract]);

  useEffect(() => {
    console.log(contract);

    contract?.get_total_supply_cap().then((totalSupply: BigNumber) => {
      console.log('t1: ', formatUnits(totalSupply, 24));
    });

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
    let timerId: NodeJS.Timer;

    if (contract) {
      timerId = setInterval(() => {
        Promise.all([
          contract.get_total_supply_cap(),
          contract.totalSupply(),
        ]).then(([totalSupplyCap, totalSupply]) => {
          console.log(
            formatUnits(totalSupply, 24),
            formatUnits(totalSupplyCap, 24),
          );
          setTotalSupply(parseInt(formatUnits(totalSupply, 24)));
          setTotalSupplyCap(parseInt(formatUnits(totalSupplyCap, 24)));
        });
      };

      timerId = setInterval(updateTotalSupply, 60000);
      updateTotalSupply();
    }
    return () => timerId && clearInterval(timerId);
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

    if (Number(originalValue) > Number(availableValue)) {
      originalValue = availableValue;
    }

    if (regex.test(originalValue)) {
      setMintValue(originalValue);
    }
  };

  const handleSetMaxValue = () => {
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

      const { hash } = await usdtContract?.approve(
        contract?.address,
        usdt.add(parseUnits('200', 6)),
      );

      notify({
        severity: 'success',
        message: 'Please wait for approving',
        autoHideDuration: 4500,
      });

      await waitTransaction(async () => {
        const receipt = await contract.provider.getTransactionReceipt(hash);
        console.log('receipt');

        if (!receipt) {
          throw new Error(`Transaction is not complited!`);
        }
      });

      setState('minting');

      await contract?.mint(qd);

      notify({
        severity: 'success',
        message: 'You have successfuly minted!',
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
          <label htmlFor="mint-input" className={styles.dollarSign}>
            QD
          </label>
          <input
            type="text"
            id="mint-input"
            className={styles.input}
            value={mintValue}
            onChange={handleChangeValue}
            placeholder="Mint amount"
            ref={inputRef}
          />
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
        className={styles.submit}
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
