import React from 'react';
import cx from 'classnames';

import icons from '../../../icons';

import styles from './Icon.module.scss';

export type IconNamesType = keyof typeof icons;

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  name: IconNamesType;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  preserveAspectRatio?: 'none';
}

const Icon: React.VFC<IconProps> = ({ className, name, onClick, ...other }) => {
  const { viewBox, url } = icons[name] as never;

  return (
    <svg
      viewBox={viewBox}
      className={cx(styles.root, className)}
      onClick={onClick}
      {...other}
    >
      <use xlinkHref={`/_next/${String(url)}`} />
    </svg>
  );
};

export default Icon;
