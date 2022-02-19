import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.ReactChildren
}

const Layout: React.VFC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {children}
      </div>
    </div>
  );
};

export default Layout;
