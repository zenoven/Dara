import Header from '../header';
import styles from './index.less';

export default (props) => {
  return (
    <>
      <Header />
      {props.children}
    </>
  )
};
