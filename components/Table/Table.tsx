import React from 'react';
import cx from 'classnames';
import shortedHash from '../../utils/shorted-hash';
import { Transaction } from '../../types';

import styles from './Table.module.scss';
import { formatDate, formatTime } from '../../utils/format-date';
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
          <th>Date</th>
          <th>Address</th>
          <th className={styles.right}>QD bought</th>
          <th className={styles.right}>USDT deposited</th>
          <th className={styles.right}>Gain</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data.map((item) => {
          const row = item.value;
          return (
            <tr key={item.id}>
              <td>
                {formatDate(row.timestamp)}
                <time>{formatTime(row.timestamp)}</time>
              </td>
              <td>{shortedHash(row.address)}</td>
              <td className={styles.right}>
                {numberWithCommas(parseInt(row.qdAmount))}
              </td>
              <td className={styles.right}>
                {numberWithCommas(parseInt(row.costInUsd))}
              </td>
              <td className={styles.right}>
                {numberWithCommas(
                  (Number(row.qdAmount) - Number(row.costInUsd)).toFixed(),
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
