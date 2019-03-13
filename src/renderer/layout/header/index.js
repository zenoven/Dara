import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Layout, Radio, Icon, Input, Row, Col, Button } from 'antd';
import styles from './index.less';

const radioItems = [
  {
    key: 'active',
    countProps: 'numActive',
    text: '进行中',
    icon: 'caret-right'
  },
  {
    key: 'waiting',
    countProps: 'numWaiting',
    text: '已暂停',
    icon: 'pause',
  },
  {
    key: 'stopped',
    // numStopped: The number of stopped downloads in the current session. This value is capped by the --max-download-result option.
    // numStoppedTotal: The number of stopped downloads in the current session and not capped by the --max-download-result option.
    countProps: 'numStopped',
    text: '已完成',
    icon: 'check',
  },
];

const getElementList = (stat) => radioItems.map(({ key, text, icon, countProps }) =>
  <Radio.Button key={key} value={key}>
    <Icon type={icon} /><span className={styles.radioText}>{text} ({stat[countProps]})</span>
  </Radio.Button>
);

class Header extends PureComponent {
  handleChangeTab = (e) => {
    let {
      dispatch,
    } = this.props;
    dispatch({
      type: 'task/changeTab',
      payload: {
        tab: e.target.value,
      },
    });
  }

  render() {
    let {
      task: {
        tab,
        stat,
      },
    } = this.props;
    return (
      <Layout.Header className={styles.header}>
        <Row type='flex' gutter={0} >
          <Col span={6}>
            <Button icon='plus-circle' className={styles.newTaskButton} type='primary'>新任务</Button>
          </Col>
          <Col span={12}>
            <Radio.Group value={tab} onChange={this.handleChangeTab} >
              {getElementList(stat)}
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