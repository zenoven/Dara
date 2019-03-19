import Sidebar from 'layout/sidebar';
import styles from './index.less';

export default (props) => {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={styles.content}>{props.children}</div>
    </div>
  )
};
