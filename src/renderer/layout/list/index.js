import { connect } from 'dva';
import { Table, Progress, Icon } from 'antd';
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
    render(text) {
      text = parseFloat(text);
      let done = text === 100;
      let type = done ? 'circle' : 'line';
      return done ? <Icon type='check-circle' className={styles.done} /> : <Progress type={type} percent={text} showInfo={!done} />
    }
  },
  {
    dataIndex: 'downloadSpeed',
    title: '速度',
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
        columns={getColumns(props)}
        dataSource={list.map(formatTask)}
        pagination={false}
      />
    </div>
  )
}

export default connect(({ task }) => ({ task }))(List);