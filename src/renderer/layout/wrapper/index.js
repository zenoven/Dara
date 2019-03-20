import Sidebar from 'layout/sidebar';
import styles from './index.less';

export default ({noSidebar, hideNav, ...props}) => {
  return (
    <div className={styles.wrapper}>
      {
        noSidebar
          ? props.children
          : (
            <>
              <Sidebar />
              <div className={styles.content}>{props.children}</div>
            </>
          )
      }
    </div>
  )
};
