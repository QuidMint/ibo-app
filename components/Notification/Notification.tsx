import React from 'react';
import cn from 'classnames';
import { Icon } from '../Lib/Icon';

import styles from './Notification.module.scss';

export type NotificationProps = {
  className?: string;
  severity?: 'error' | 'info' | 'success';
  message: string;
  onClose?: () => void;
};

export const Notification: React.FC<NotificationProps> = ({
  className,
  severity = 'info',
  message,
  onClose,
}) => (
  <div
    tabIndex={0}
    role="button"
    className={cn(styles.root, styles[severity], className)}
    onClick={onClose}
  >
    <p className={styles.message}>{message}</p>
    <Icon
      name="btn-bg"
      preserveAspectRatio="none"
      className={styles.background}
    />
  </div>
);
