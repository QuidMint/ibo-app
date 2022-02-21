import React from 'react';
import cx from 'classnames';
import shortedHash from '../../utils/shorted-hash';

import styles from './Table.module.scss';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  rarefied?: boolean;
  data: {
    id: string;
    date: string;
    time: string;
    address: string;
    qd: string;
    usdt: string;
    gain: string;
  }[];
}

const Table: React.VFC<TableProps> = ({
  className,
  data,
  rarefied = false,
  ...other
}) => {
  if (!data.length) {
    return null;
  }

  return (
    <table
      className={cx(styles.root, { [styles.rarefied]: rarefied }, className)}
      {...other}
    >
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
        {data.map((tr: any) => (
          <tr key={tr.id}>
            <td>
              {tr.date}
              <time>{tr.time}</time>
            </td>
            <td>{shortedHash(tr.address)}</td>
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
