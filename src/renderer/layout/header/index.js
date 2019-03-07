import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import styles from './index.less';

export default class Header extends PureComponent {
  render() {
    return (
      <div className={styles.header}>
        header demo
      </div>
    )
  }
}