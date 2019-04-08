import { connect } from 'dva';
import { Table, Progress, Icon, Tooltip, Tabs } from 'antd';
import names from 'classnames';
import { remote } from 'electron';
import is from 'electron-is';
import styles from './index.less';
import { formatTask } from 'utils';
import { statusList } from 'layout/sidebar';

const widthMap = {
  active: {
    name: '30%',
    progress: '30%',
    // downloadSpeed: '20%',
    actions: '100px',
  },
  waiting: {
    name: '30%',
    progress: '30%',
    // downloadSpeed: '20%',
    actions: '100px',
  },
  stopped: {
    // name: '50%',
    actions: '100px',
  }
}
const TabPane = Tabs.TabPane;
const getColumns = (props) => {
  let {
    task: {
      tab
    }
   } = props;
  let columns = [
    {
      dataIndex: 'name',
      title: '名称',
    },
    {
      dataIndex: 'progress',
      title: '进度',
      hide: props.task.tab === 'stopped',
      render(text) {
        text = parseFloat(text);
        return <Progress percent={text} />
      }
    },
    {
      dataIndex: 'downloadSpeed',
      title: '速度',
      hide: props.task.tab === 'stopped',
    },
    {
      dataIndex: 'actions',
      title: '操作',
      render(text) {
        text = parseFloat(text);
        return (
          <div className={styles.actionsWrapper}>
            <a href="javascript:;">
              <Tooltip title='打开所在文件夹'>
                <Icon type='folder-open' className={styles.actionIcon} />
              </Tooltip>
            </a>
            <a href="javascript:;">
              <Tooltip title='删除'>
                <Icon type='delete' className={names(styles.actionIcon, styles.deleteIcon)} />
              </Tooltip>
            </a>
          </div>
        );
      }
    },
  ];
  return columns.map((col) => {
    let { dataIndex } = col;
    let result = Object.assign({}, col);
    if (widthMap[tab][dataIndex]) {
      result.width = widthMap[tab][dataIndex]
    };
    return result;
  })
};

const List = (props) => {
  let {
    task: {
      tab,
      list,
    }
  } = props;
  return (
    <div className={styles.list}>
      <Tabs
        activeKey={tab}
        onChange={this.changeTab}
        renderTabBar={() => <div></div> }
        animated={false}
      >
        {
          statusList.map(({ key }) => {
            return (
              <TabPane key={key} tab={null}>
                <Table
                  rowKey='gid'
                  columns={getColumns(props).filter(({hide}) => !hide)}
                  dataSource={list[key].map(formatTask)}
                  pagination={false}
                />
              </TabPane>
            )
          })
        }
      </Tabs>
    </div>
  )
}

export default connect(({ task }) => ({ task }))(List);