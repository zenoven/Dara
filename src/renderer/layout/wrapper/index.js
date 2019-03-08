import Header from 'layout/header';
import styles from './index.less';
import { Layout, Menu } from 'antd';

const { Content } = Layout;

export default (props) => {
  return (
    <Layout className={styles.wrapper}>
      <Header />
      <Content className={styles.content}>{props.children}</Content>
    </Layout>
  )
};
