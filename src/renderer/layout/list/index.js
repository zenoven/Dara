import { connect } from 'dva';
import { Table, Progress, Icon, Tooltip } from 'antd';
import names from 'classnames';
// import { remote } from 'electron';
// import is from 'electron-is';
import styles from './index.less';
import { formatTask } from 'utils';

let lastList = [];

const getColumns = (props) => ([
  {
    dataIndex: 'name',
    // title: '名称',
    title: 'hello',
  },
  {
    dataIndex: 'progress',
    // title: '进度',
    title: 'world',
    hide: props.task.tab === 'stopped',
    render(text) {
      text = parseFloat(text);
      return <Progress percent={text} />
    }
  },
  {
    dataIndex: 'downloadSpeed',
    // title: '速度',
    title: 'ni',
    hide: props.task.tab === 'stopped',
  },
  {
    dataIndex: 'actions',
    // title: '操作',
    title: 'ac',
    render(text) {
      text = parseFloat(text);
      return (
        <div className={styles.actionsWrapper}>
          {/* <a href="javascript:;">
            <Tooltip title='打开所在文件夹'>
              <Icon type='folder-open' className={styles.actionIcon} />
            </Tooltip>
          </a>
          <a href="javascript:;">
            <Tooltip title='删除'>
              <Icon type='delete' className={names(styles.actionIcon, styles.deleteIcon)} />
            </Tooltip>
          </a> */}
        </div>
      );
    }
  },
]);

const List = (props) => {
  let {
    task: {
      list,
      tab
    }
  } = props;
  if (lastList !== list) {
    console.timeEnd('changeTab cost render');
  }
  lastList = list;
  return (
    <div className={styles.list} style={{opacity: 0.25}}>
      tab:{tab}, with:
      {
        list && list.length
          ? <span>dataset length: {list.length}</span>
          : <span>no data</span>
      }
      <Table
        rowKey='gid'
        columns={getColumns(props).filter(({hide}) => !hide)}
        dataSource={list.map(formatTask)}
        pagination={false}
      />
    </div>
  )
}

export default connect(({ task }) => ({ task }))(List);