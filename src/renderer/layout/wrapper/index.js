import Sidebar from 'layout/sidebar';
import styles from './index.less';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { noop } from 'utils';

export default ({noSidebar, hideNav, ...props}) => {
  return (
    <LocaleProvider locale={zh_CN}>
      <div className={styles.wrapper} onClick={props.onClick || noop}>
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
    </LocaleProvider>
  )
};
