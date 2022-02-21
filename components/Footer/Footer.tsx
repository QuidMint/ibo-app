import { Icon } from '../Lib/Icon';
import { ScrollAssistant } from '../ScrollAssistant';
import styles from './Footer.module.scss';

const Footer: React.VFC = () => {
  return (
    <footer className={styles.root}>
      <button className={styles.music}>
        <Icon name="music-wave" className={styles.musicWave} />
        Music is on
      </button>
      <div className={styles.socialLinks}>
        <a
          href="https://book.quid.io/"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <Icon name="book" className={styles.socialIcon} />
        </a>
        <a
          href="https://github.com/QuidMint"
          target="_blank"
          rel="noreferrer"
          className={styles.socialLink}
        >
          <Icon name="github" className={styles.socialIcon} />
        </a>
        <a href="mailto:rich@quid.io" className={styles.socialLink}>
          <Icon name="email" className={styles.socialIcon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
