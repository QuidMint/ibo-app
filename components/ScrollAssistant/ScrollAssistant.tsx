import React, { useState } from 'react';
import cx from 'classnames';
import { Swiper as SwiperType } from 'swiper/types';

import { Icon } from '../Lib/Icon';

import styles from './ScrollAssistant.module.scss';

type ScrollAssistantProps = {
  className?: string;
  swiper: SwiperType | null;
};

const ScrollAssistant: React.VFC<ScrollAssistantProps> = ({
  className,
  swiper,
}) => {
  const [isDown, setIsDown] = useState(true);

  const handleClick = () => {
    swiper?.slideTo(swiper?.activeIndex === 0 ? 1 : 0);
    setIsDown(!swiper?.activeIndex);
  };

  return (
    <button className={cx(styles.root, className)} onClick={handleClick}>
      {isDown && 'See more'}
      <Icon
        name="arrow-down"
        className={cx(styles.icon, { [styles.upwards]: !isDown })}
      />
      {!isDown && 'Back to top'}
    </button>
  );
};

export default ScrollAssistant;
