import { connect } from 'dva';
import { remote } from 'electron';
import is from 'electron-is';
import styles from './index.less';
import { formatTask } from 'utils';

const List = ({ task, ...props }) => {
  let { list } = task;
  return (
    <div className={styles.list}>
      <ul>
        {
          list.map(formatTask).map(({gid, name, progress, ...item}, index) => {
            console.log('item props', Object.keys(item));
            console.log('name:', name);
            console.log('percent:', progress);
            return <li key={gid}>{name}-{progress}</li>;
          })
        }
      </ul>
    </div>
  )
}

export default connect(({ task }) => ({ task }))(List);