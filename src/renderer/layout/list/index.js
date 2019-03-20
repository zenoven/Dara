import { connect } from 'dva';
import { Table, Progress, Icon } from 'antd';
import names from 'classnames';
import { remote } from 'electron';
import is from 'electron-is';
import styles from './index.less';
import { formatTask } from 'utils';

const getColumns = (props) => ([
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
          <a href="javascript:;"><Icon type='folder-open' className={styles.actionIcon} /></a>
          <a href="javascript:;"><Icon type='delete' className={names(styles.actionIcon, styles.deleteIcon)} /></a>
        </div>
      );
    }
  },
]);

const List = (props) => {
  let {
    task: {
      list
    }
  } = props;
  return (
    <div className={styles.list}>
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