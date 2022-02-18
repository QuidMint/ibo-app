import type { NextPage } from 'next';
import { Icon } from '../Lib/Icon';
import styles from './Footer.module.scss';

const Footer: NextPage = () => {
  return (
    <footer className={styles.root}>
      <button className={styles.music}>
        <Icon name="music-wave" className={styles.musicWave} />
        Music is on
      </button>
      <button className={styles.scroll}>
        Scroll
        <Icon name="arrow-down" className={styles.scrollIcon} />
      </button>
      <div className={styles.info}>
        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialLink}>
            <Icon name="twitter" className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink}>
            <Icon name="github" className={styles.socialIcon} />
          </a>
          <a href="#" className={styles.socialLink}>
            <Icon name="email" className={styles.socialIcon} />
          </a>
        </div>
      </div>
    </footer >
  );
};

export default Footer;