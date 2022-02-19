import React from 'react';
import cx from 'classnames';

import styles from './Table.module.scss';

const TABLE_MOCK_DATA = [
  {
    id: '0',
    date: '01.02.2022',
    time: '12:00',
    address: '0x4g6h...4dfb',
    qd: '12,000,000',
    usdt: '$9,999,000.34',
    gain: '$9,999,000.34',
  },
  {
    id: '1',
    date: '01.02.2022',
    time: '12:34',
    address: '0x345g...bn67',
    qd: '12,000,000',
    usdt: '$1,000.00',
    gain: '$9,999,000.34',
  },
  {
    id: '2',
    date: '01.02.2022',
    time: '14:56',
    address: '0x1svf...kio9',
    qd: '12,000,000',
    usdt: '$100.56',
    gain: '$9,999,000.34',
  },
];

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
}

const Table: React.VFC<TableProps> = ({ className, ...other }) => {
  return (
    <table className={cx(styles.root, className)} {...other}>
      <thead className={styles.header}>
        <tr>
          <th>Date</th>
          <th>Address</th>
          <th className={styles.right}>QD bought</th>
          <th className={styles.right}>USDT deposited</th>
          <th className={styles.right}>Gain</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {TABLE_MOCK_DATA.map((tr) => (
          <tr key={tr.id}>
            <td>
              {tr.date}
              <time>{tr.time}</time>
            </td>
            <td>{tr.address}</td>
            <td className={styles.right}>{tr.qd}</td>
            <td className={styles.right}>{tr.usdt}</td>
            <td className={styles.right}>{tr.gain}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
