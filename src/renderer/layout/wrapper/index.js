import Header from 'layout/header';
import styles from './index.less';

export default (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
};
