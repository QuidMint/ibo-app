import React from 'react';
import cn from 'classnames';

import icons from '../../../icons';

import s from './Icon.module.scss';

export type IconNamesType = keyof typeof icons;

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  name: IconNamesType;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

const Icon: React.VFC<IconProps> = ({ className, name, onClick, ...other }) => {
  const { viewBox, url } = icons[name] as never;

  return (
    <svg
      viewBox={viewBox}
      className={cn(s.root, className)}
      onClick={onClick}
      {...other}
    >
      <use xlinkHref={`/_next/${String(url)}`} />
    </svg>
  );
};

export default Icon;
