import type { NextPage } from 'next';
import Head from 'next/head';
import { Mint } from '../components/Mint';
import { Summary } from '../components/Summary';
import { Table } from '../components/Table';
import styles from '../styles/Home.module.scss';

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>QUID</title>
        <meta name="description" content="quid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.side}>
        <Summary />
      </div>
      <div className={styles.content}>
        <div className={styles.mintContainer}>
          <Mint />
        </div>
        <Table />
      </div>
      <div className={styles.fakeCol} />
    </div>
  );
};

export default Home;
