import type { AppProps } from 'next/app'
import styles from '../styles/Layout.module.scss'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp
