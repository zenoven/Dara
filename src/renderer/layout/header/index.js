import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Layout, Menu } from 'antd';
import styles from './index.less';

export default class Header extends PureComponent {
  render() {
    return (
      <Layout.Header className={styles.header}>
        hsdf
      </Layout.Header>
    )
  }
}