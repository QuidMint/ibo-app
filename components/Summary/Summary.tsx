import { BigNumber } from '@ethersproject/bignumber';
import { getNetwork } from '@ethersproject/networks';
import { formatUnits, parseUnits } from '@ethersproject/units';
import { useEffect, useState } from 'react';
import { useQuidContract } from '../../hooks/use-quid-contract';
import { useUsdtContract } from '../../hooks/use-usdt-contract';
import { useWallet } from '../../hooks/use-wallet';
import { numberWithCommas } from '../../utils/number-with-commas';
import shortedHash from '../../utils/shorted-hash';
import styles from './Summary.module.scss';

const SECONDS_IN_DAY = 86400;
const currentTimestamp = (Date.now() / 1000).toFixed(0);
const defaultNewtork = process.env.NEXT_PUBLIC_NETWOKR;
const contractId = process.env.NEXT_PUBLIC_CONTRACT_ID;

const Summary: React.VFC = () => {
  const { chainId } = useWallet();
  const contract = useQuidContract();
  const usdtContract = useUsdtContract();
  const [smartContractStartTimestamp, setSmartContractStartTimestamp] =
    useState<string>('');
  const [mintPeriodDays, setMintPeriodDays] = useState<string>('');
  const [totalDeposited, setTotalDeposited] = useState<string>('');
  const [totalMinted, setTotalMinted] = useState<string>('');
  const [price, setPrice] = useState<string>(' ');
  const networkName = chainId && getNetwork(parseInt(chainId, 16)).name;

  useEffect(() => {
    contract?.SALE_LENGTH().then((data: any) => {
      setMintPeriodDays(String(data.toNumber() / SECONDS_IN_DAY));
    });

    contract?.sale_start().then((data: BigNumber) => {
      setSmartContractStartTimestamp(data.toString());
    });

    const updateInfo = () => {
      const qdAmount = parseUnits('1', 24);
      contract
        ?.qd_amt_to_usdt_amt(qdAmount, currentTimestamp)
        .then((data: BigNumber) => {
          setPrice(String(Number(formatUnits(data, 6)) * 100));
        });

      contract?.totalSupply().then((totalSupply: BigNumber) => {
        setTotalMinted(formatUnits(totalSupply, 24).split('.')[0]);
      });

      usdtContract
        ?.balanceOf(process.env.NEXT_PUBLIC_CONTRACT_ID)
        .then((data: BigNumber) => {
          setTotalDeposited(formatUnits(data, 6));
        });
    };

    const timerId = setInterval(updateInfo, 5000);

    updateInfo();

    return () => clearInterval(timerId);
  }, [contract, usdtContract]);

  const daysLeft = smartContractStartTimestamp ? (
    Math.ceil(
      Number(mintPeriodDays) -
        (Number(currentTimestamp) - Number(smartContractStartTimestamp)) /
          SECONDS_IN_DAY,
    )
  ) : (
    <>&nbsp;</>
  );

  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.title}>Days left</div>
        <div className={styles.value}>{daysLeft}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Current price</div>
        <div className={styles.value}>
          <span className={styles.cents}>{Number(price).toFixed(0)}</span>
          Cents
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>USDT Deposited</div>
        <div className={styles.value}>
          ${numberWithCommas(parseFloat(totalDeposited).toFixed())}
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Minted QD</div>
        <div className={styles.value}>{numberWithCommas(totalMinted)}</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Contract</div>
        <div className={styles.valueSmall}>
          <a
            href={`https://${
              defaultNewtork === 'mainnet' ? '' : defaultNewtork + '.'
            }etherscan.io/address/${contractId}`}
            target="_blank"
            rel="noreferrer"
          >
            {contractId && shortedHash(contractId)}
          </a>
        </div>
      </div>
      {
        networkName && networkName !== 'homestead' ? (
          <div className={styles.section}>
            <div className={styles.title}>Network</div>
            <div className={styles.valueSmall}>
              {chainId && getNetwork(parseInt(chainId, 16)).name}
            </div>
          </div>
        ) : null
      }
    </div>
  );
};

export default Summary;
