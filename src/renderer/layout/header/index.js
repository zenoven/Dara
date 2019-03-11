import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Layout, Radio, Icon, Input, Row, Col, Button } from 'antd';
import styles from './index.less';

const radioItems = [
  {
    key: 'active',
    text: '进行中',
    icon: 'caret-right'
  },
  {
    key: 'waiting',
    text: '已暂停',
    icon: 'pause',
  },
  {
    key: 'stopped',
    text: '已完成',
    icon: 'check',
  },
];

const elementList = radioItems.map(({ key, text, icon }) =>
  <Radio.Button key={key} value={key}>
    <Icon type={icon} /><span className={styles.radioText}>{text}</span>
  </Radio.Button>
);

class Header extends PureComponent {
  handleChangeTab = (e) => {
    let {
      dispatch,
    } = this.props;
    dispatch({
      type: 'task/fetchList',
      payload: {
        tab: e.target.value,
        params: []
      },
    })
  }

  render() {
    let {
      task: {
        tab,
      },
      dispatch,
    } = this.props;
    console.log('this.props.task', this.props.task);
    return (
      <Layout.Header className={styles.header}>
        <Row type='flex' gutter={0} >
          <Col span={6}>
            <Button icon='plus-circle' className={styles.newTaskButton} type='primary'>新任务</Button>
          </Col>
          <Col span={12}>
            <Radio.Group value={tab} onChange={this.handleChangeTab} >
              {elementList}
            </Radio.Group>
          </Col>
          <Col span={6}>
            <Input.Search className={styles.searchInput} placeholder='请输入要查找的任务名' />
          </Col>
        </Row>
      </Layout.Header>
    )
  }
}
export default connect(({task}) => ({task}))(Header)