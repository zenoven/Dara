import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Icon, Menu, Button } from 'antd';
import styles from './index.less';

const { window } = remote.getGlobal('services');
const MenuItem = Menu.Item;

export const statusList = [
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


class Header extends PureComponent {
  handleChangeStatus = ({key}) => {
    let {
      dispatch,
    } = this.props;
    dispatch({
      type: 'task/changeTab',
      payload: {
        tab: key,
      },
    });
  }

  add = () => {
    window.toggleNewTaskModal(true);
  }

  render() {
    let {
      task: {
        tab,
        stat,
      },
    } = this.props;
    return (
      <div className={styles.sidebar} >
        <Menu
          onClick={this.handleChangeStatus}
          defaultSelectedKeys={[tab]}
          className={styles.menu}
        >
          {
            statusList.map(({ text, icon, key, countProps }) => {
              let count = stat[countProps] && stat[countProps] > 0 ? <> ({stat[countProps]})</> : null;
              return (
                <MenuItem key={key} className={styles.menuItem}>
                  <Icon type={icon} />
                  <span className={styles.radioText}>{text}{count}</span>
                </MenuItem>
              )
            })
          }
        </Menu>
        <div className={styles.addTaskButtonWrapper}>
          <Button
            type='primary'
            ghost
            block
            size='large'
            icon='plus'
            onClick={this.add}
          >添加</Button>
        </div>
      </div>
    )
  }
}
export default connect(({task}) => ({task}))(Header)