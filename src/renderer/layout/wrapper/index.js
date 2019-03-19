import Sidebar from 'layout/sidebar';
import styles from './index.less';

export default ({hideSidebar, hideNav, ...props}) => {
  return (
    <div className={styles.wrapper}>
      {!hideSidebar && <Sidebar />}
      <div className={styles.content}>{props.children}</div>
    </div>
  )
};
