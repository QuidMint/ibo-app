import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperType } from 'swiper/types';

import { Mint } from '../components/Mint';
import { Summary } from '../components/Summary';
import { Table } from '../components/Table';
import { ScrollAssistant } from '../components/ScrollAssistant';

import styles from '../styles/Home.module.scss';
import 'swiper/css';

const TABLE_MOCK_DATA = [
  {
    id: '0',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '1',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '2',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '3',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '4',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '5',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '6',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '7',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '8',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '9',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '10',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '10',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '11',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '12',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '13',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '14',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '15',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '16',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h000004dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '17',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g00000bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '18',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '19',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
  {
    id: '20',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf00000kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
];

const Home: NextPage = () => {
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
            <Table data={[]} />
          </div>
          <div className={styles.fakeCol} />
        </SwiperSlide>
        <SwiperSlide className={styles.slide}>
          <div className={styles.tableSlide}>
            <div className={styles.tableWrapper}>
              <h2 className={styles.tableSlideTitle}>Transactions</h2>
              <Table rarefied data={TABLE_MOCK_DATA} />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div className={styles.scrollAssist}>
        <ScrollAssistant swiper={swiperRef} />
      </div>
    </div>
  );
};

export default Home;
