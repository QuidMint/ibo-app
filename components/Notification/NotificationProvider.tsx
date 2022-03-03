import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { NotificationProps } from './Notification';

type NotificationData = Omit<NotificationProps, 'onClose' | 'className'> & {
  autoHideDuration: number;
  timestamp: number;
};

type NotificationInput = Optional<
  Omit<NotificationData, 'timestamp'>,
  'autoHideDuration'
>;

export const NotificationContext = React.createContext<{
  notifications: NotificationData[];
  notify: (notification: NotificationInput) => void;
  close: (notification: NotificationData) => void;
}>({
  notifications: [],
  notify: (notification: NotificationInput): void => {
    throw new Error('Method not implemented.');
  },
  close: (notification: NotificationData): void => {
    throw new Error('Method not implemented.');
  },
});

type NotificationProviderProps = {
  autoHideDuration?: number;
};

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  autoHideDuration = 2500,
  children,
}) => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);

  const notify = useCallback(
    (notification: NotificationInput) => {
      setNotifications((prevState) => [
        {
          ...notification,
          timestamp: Date.now(),
          autoHideDuration: notification.autoHideDuration || autoHideDuration,
        },
        ...prevState,
      ]);
    },
    [setNotifications, autoHideDuration],
  );

  const close = useCallback(
    (notification: NotificationData) => {
      setNotifications((prevState) =>
        prevState.filter((item) => item !== notification),
      );
    },
    [setNotifications],
  );

  const value = useMemo(
    () => ({ notifications, notify, close }),
    [close, notifications, notify],
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      const currentTimestamp = Date.now();
      const filteredNotifications = notifications.filter((notification) => {
        return (
          notification.autoHideDuration + notification.timestamp >
          currentTimestamp
        );
      });

      if (filteredNotifications.length !== notifications.length) {
        setNotifications(filteredNotifications);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [notifications]);

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
