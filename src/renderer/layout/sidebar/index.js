import { connect } from 'dva';
import { remote } from 'electron';
import React, { PureComponent } from 'react';
import { Icon, Menu } from 'antd';
import styles from './index.less';

const MenuItem = Menu.Item;

const statusList = [
  {
    key: 'active',
    countProps: 'numActive',
    // text: '进行中',
    text: 'aaa',
    // icon: 'caret-right'
  },
  {
    key: 'waiting',
    countProps: 'numWaiting',
    // text: '已暂停',
    text: 'bbb',
    // icon: 'pause',
  },
  {
    key: 'stopped',
    // numStopped: The number of stopped downloads in the current session. This value is capped by the --max-download-result option.
    // numStoppedTotal: The number of stopped downloads in the current session and not capped by the --max-download-result option.
    countProps: 'numStopped',
    // text: '已完成',
    text: 'ccc',
    // icon: 'check',
  },
];


class Header extends PureComponent {
  handleChangeStatus = ({ key }) => {
    console.time('changeTab cost render');
    let {
      dispatch,
    } = this.props;
    dispatch({
      type: 'task/changeTab',
      payload: {
        tab: key,
      },
    });
    console.log('window.location.href:', window.location.href);
  }

  render() {
    let {
      task: {
        tab,
        stat,
      },
    } = this.props;
    return (
      <div className={styles.sidebar} style={{opacity: 0.25}} >
        <div
          // onClick={this.handleChangeStatus}
          // defaultSelectedKeys={[tab]}
          className={styles.menu}
        >
          {
            statusList.map(({ text, icon, key, countProps }) => {
              let count = stat[countProps] && stat[countProps] > 0 ? <> ({stat[countProps]})</> : null;
              return (
                <div key={key} className={styles.menuItem} style={{margin: 0}} >
                  {icon && <Icon type={icon} />}
                  <span className={styles.radioText} onClick={() => this.handleChangeStatus({key})}>{text}{count}</span>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
export default connect(({task}) => ({task}))(Header)