import React from 'react';
import cx from 'classnames';

import styles from './Table.module.scss';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
}

const Table: React.VFC<TableProps> = ({ className, ...other }) => {
  return (
    <table className={cx(styles.root, className)} {...other}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Address</th>
          <th>QD bought</th>
          <th>USDT deposited</th>
          <th>Gain</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>01.02.2022 <time>12:00</time></td>
          <td>0x4g6h...4dfb</td>
          <td>12,000,000</td>
          <td>$9,999,000.34</td>
          <td>$9,999,000.34</td>
        </tr>
        <tr>
          <td>01.02.2022 <time>12:00</time></td>
          <td>0x4g6h...4dfb</td>
          <td>12,000,000</td>
          <td>$9,999,000.34</td>
          <td>$9,999,000.34</td>
        </tr>
        <tr>
          <td>01.02.2022 <time>12:00</time></td>
          <td>0x4g6h...4dfb</td>
          <td>12,000,000</td>
          <td>$9,999,000.34</td>
          <td>$9,999,000.34</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
