import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.root}>
      <Head>
        <title>QUID</title>
        <meta name="description" content="quid" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <a className={styles.logo} />
          </Link>
        </div>
        <div className={styles.summary}>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Days left
            </div>
            <div className={styles.summaryElValue}>
              34
            </div>
          </div>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Your total mint
            </div>
            <div className={styles.summaryElValue}>
              $20,000
            </div>
          </div>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Gains
            </div>
            <div className={styles.summaryElValue}>
              $452,571
            </div>
          </div>
        </div>
        <div className={styles.walletContainer}>
          <div className={styles.summaryEl}>
            <div className={styles.summaryElTitle}>
              Wallet balance
            </div>
            <div className={styles.summaryElValue}>
              $452,571
            </div>
          </div>
          <button className={styles.wallet}>Connect Metamask</button>
        </div>
      </header>

      <main className={styles.main}>

      </main>

      <footer className={styles.footer}>
        <button>Music is on</button>
        <button>Scroll</button>
        <div>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
        </div>
      </footer>
    </div>
  )
}

export default Home;
