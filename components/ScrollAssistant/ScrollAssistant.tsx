import React, { useState } from 'react';
import cx from 'classnames';

import { Icon } from '../Lib/Icon';

import styles from './ScrollAssistant.module.scss';

const ScrollAssistant: React.VFC = () => {
  const [isDown, setIsDown] = useState(true);

  const handleClick = () => {
    setIsDown(!isDown);
  };

  return (
    <button className={styles.root} onClick={handleClick}>
      {isDown ? 'See more' : 'Back to top'}
      <Icon
        name="arrow-down"
        className={cx(styles.icon, { [styles.upwards]: !isDown })}
      />
    </button>
  );
};

export default ScrollAssistant;
