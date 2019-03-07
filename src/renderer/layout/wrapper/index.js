import Header from 'layout/header';
import styles from './index.less';

export default (props) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      {props.children}
    </div>
  )
};
