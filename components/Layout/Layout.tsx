import type { NextPage } from 'next';
import styles from './Layout.module.scss';

const Layout: NextPage = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
