import { connect } from 'dva';
import { remote } from 'electron';
import is from 'electron-is';
import Wrapper from 'layout/wrapper';
import List from 'layout/list';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const {
  application,
  window
} = remote.getGlobal('services');

export default connect(({ task }) => ({ task }))((props) =>
  <LocaleProvider locale={zh_CN}>
    <Wrapper>
      <List />
    </Wrapper>
  </LocaleProvider>
);
