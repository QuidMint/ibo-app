import { UserInfoResponse } from '../../types';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './Layout.module.scss';

type LayoutProps = {
  userInfo: UserInfoResponse;
};

const Layout: React.FC<LayoutProps> = ({ children, userInfo }) => {
  return (
    <div className={styles.root}>
      <Header userInfo={userInfo} />

      <main className={styles.main}>{children}</main>

      <Footer />
    </div>
  );
};

export default Layout;
