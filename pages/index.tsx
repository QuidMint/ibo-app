import type { NextPage } from 'next'
import Head from 'next/head'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Mint } from '../components/Mint'
import { Summary } from '../components/Summary'
import { Table } from '../components/Table'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>QUID</title>
        <meta name="description" content="quid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <div className={styles.side}>
          <Summary />
        </div>
        <div className={styles.content}>
          <Mint />
          <Table />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home;
