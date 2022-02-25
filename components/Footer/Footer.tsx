import { Icon } from '../Lib/Icon';
import cx from 'classnames';
import styles from './Footer.module.scss';

const Footer: React.VFC = () => {
  return (
    <footer className={styles.root}>
      <div className={styles.media}>
        <button className={styles.music}>
          <Icon name="music-wave" className={styles.musicWave} />
          Music is on
        </button>
        <div className={styles.spacer} />
        <a
          href="https://www.youtube.com/watch?v=uHjjcv1DAIg"
          target="_blank"
          rel="noreferrer"
          className={styles.youtube}
        >
          <Icon name="youtube" className={styles.youtubeIcon} />
          Watch video
        </a>
      </div>
      <div className={styles.socialLinks}>
        <a
          href="https://book.quid.io/"
          target="_blank"
          rel="noreferrer"
          className={cx(styles.socialLink, styles.socialLink1)}
        >
          <Icon name="book" className={styles.socialIcon} />
          <Icon name="link-hover-1" className={styles.socialIconHover} />
        </a>
        <a
          href="https://github.com/QuidMint"
          target="_blank"
          rel="noreferrer"
          className={cx(styles.socialLink, styles.socialLink2)}
        >
          <Icon name="github" className={styles.socialIcon} />
          <Icon name="link-hover-2" className={styles.socialIconHover} />
        </a>
        <a
          href="mailto:rich@quid.io"
          className={cx(styles.socialLink, styles.socialLink3)}
        >
          <Icon name="email" className={styles.socialIcon} />
          <Icon name="link-hover-3" className={styles.socialIconHover} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
