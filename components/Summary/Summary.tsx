import styles from './Summary.module.scss';

const Summary: React.VFC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.section}>
        <div className={styles.title}>Days left</div>
        <div className={styles.value}>34</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Current price</div>
        <div className={styles.value}>
          <span className={styles.cents}>12</span>
          Cents
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Total Deposited</div>
        <div className={styles.value}>$120,000</div>
      </div>
      <div className={styles.section}>
        <div className={styles.title}>Total Minted</div>
        <div className={styles.value}>20,000</div>
      </div>
    </div>
  );
};

export default Summary;
