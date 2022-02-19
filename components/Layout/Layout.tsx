import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactChildren;
};

const Layout: React.VFC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Header />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
