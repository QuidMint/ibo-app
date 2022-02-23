import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Mint } from '../components/Mint';
import { Summary } from '../components/Summary';
import { Table } from '../components/Table';
import { ScrollAssistant } from '../components/ScrollAssistant';
import { PaginationResponse, Transaction } from '../types';

import styles from '../styles/Home.module.scss';
import 'swiper/swiper.min.css';

type HomeProps = {
  transactions: PaginationResponse<Transaction>;
};

const Home: NextPage<HomeProps> = ({ transactions }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [transactions, setTransactions] = useState<any>(null);
  const [accountInfo, setAccountInfo] = useState<any>(null);

  useEffect(() => {
    getTransactions().then(setTransactions);
  }, []);

  useEffect(() => {
    getAccountInfo().then(setAccountInfo);
  }, []);

const Home: NextPage<HomeProps> = ({ transactions }) => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  return (
    <div className={styles.root}>
      <Head>
        <title>QUID</title>
        <meta name="description" content="quid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Swiper
        onSwiper={(swiper) => setSwiperRef(swiper)}
        slidesPerView={1}
        direction={'vertical'}
        className={styles.carousel}
        allowTouchMove={false}
      >
        <SwiperSlide className={styles.slide}>
          <div className={styles.side}>
            <Summary />
          </div>
          <div className={styles.content}>
            <div className={styles.mintContainer}>
              <Mint />
            </div>
            <Table data={transactions?.documents.slice(0, 3)} />
          </div>
          <div className={styles.fakeCol} />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.tableSlide}>
            <div className={styles.tableWrapper}>
              <h2 className={styles.tableSlideTitle}>Transactions</h2>
              <Table rarefied data={transactions?.documents} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className={styles.scrollAssist}>
        {!!transactions?.documents?.length && (
          <ScrollAssistant swiper={swiperRef} />
        )}
      </div>
    </div>
  );
};

export default Home;
