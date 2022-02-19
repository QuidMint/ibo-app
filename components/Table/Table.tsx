import React from 'react';
import cx from 'classnames';

import styles from './Table.module.scss';

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
          <th align='right'>QD bought</th>
          <th align='right'>USDT deposited</th>
          <th align='right'>Gain</th>
        </tr>
      </thead>
      <tbody className={styles.body}>
        <tr>
          <td>01.02.2022<time>12:00</time></td>
          <td>0x4g6h...4dfb</td>
          <td align='right'>12,000,000</td>
          <td align='right'>$9,999,000.34</td>
          <td align='right'>$9,999,000.34</td>
        </tr>
        <tr>
          <td>01.02.2022<time>12:34</time></td>
          <td>0x345g...bn67</td>
          <td align='right'>12,000,000</td>
          <td align='right'>$1,000.00</td>
          <td align='right'>$9,999,000.34</td>
        </tr>
        <tr>
          <td>01.02.2022<time>14:56</time></td>
          <td>0x1svf...kio9</td>
          <td align='right'>12,000,000</td>
          <td align='right'>$100.56</td>
          <td align='right'>$9,999,000.34</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
