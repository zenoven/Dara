import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Layout, Radio, Icon, Input, Row, Col, Button } from 'antd';
import styles from './index.less';

const radioItems = [
  {
    key: 'in-progress',
    text: '进行中',
    icon: 'caret-right'
  },
  {
    key: 'paused',
    text: '已暂停',
    icon: 'pause',
  },
  {
    key: 'done',
    text: '已完成',
    icon: 'check',
  },
];

const elementList = radioItems.map(({ key, text, icon }) =>
  <Radio.Button key={key} value={key}>
    <Icon type={icon} /><span className={styles.radioText}>{text}</span>
  </Radio.Button>
);

export default class Header extends PureComponent {
  render() {
    return (
      <Layout.Header className={styles.header}>
        <Row type='flex'>
          <Col span={8}>
            <Button icon='plus-circle' className={styles.newTaskButton} type='primary'>新任务</Button>
          </Col>
          <Col span={8}>
            <Radio.Group defaultValue='in-progress' >
              {elementList}
            </Radio.Group>
          </Col>
          <Col push={3} span={5}>
            <Input.Search placeholder='请输入要查找的任务名' />
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}