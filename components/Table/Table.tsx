import React from 'react';
import cx from 'classnames';
import shortedHash from '../../utils/shorted-hash';
import { Transaction } from '../../types';

import styles from './Table.module.scss';
import { formatTime, formatDateNoYear } from '../../utils/format-date';
import { numberWithCommas } from '../../utils/number-with-commas';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
  rarefied?: boolean;
  data: { id: string; value: Transaction }[];
}

const Table: React.VFC<TableProps> = ({
  className,
  data,
  rarefied = false,
  ...other
}) => {
  if (!data || !data.length) {
    return null;
  }

  return (
    <table
      className={cx(styles.root, { [styles.rarefied]: rarefied }, className)}
      {...other}
    >
      <thead className={styles.header}>
        <tr>
          <th className={styles.right}>Minted QD</th>
          <th className={styles.right}>Paid in USDT</th>
          <th className={styles.right}>Gain</th>
          <th>Date</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data.map((item) => {
          const row = item.value;
          return (
            <tr key={item.id}>
              <td className={styles.right}>
                {Number(row.qdAmount).toFixed(2)}
              </td>
              <td className={styles.right}>
                {numberWithCommas(parseInt(row.costInUsd))}
              </td>
              <td className={styles.right}>
                $ {numberWithCommas(
                  (Number(row.qdAmount) - Number(row.costInUsd)).toFixed(),
                )}
              </td>
              <td>
                {formatDateNoYear(row.timestamp)}
                <time>{formatTime(row.timestamp)}</time>
              </td>
              <td>{shortedHash(row.address)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
