import { connect } from 'dva';
import { remote } from 'electron';
import is from 'electron-is';
import Wrapper from 'layout/wrapper';
import List from 'layout/list'

const {
  application,
  window
} = remote.getGlobal('services');

export default connect(({task}) => ({task}))((props) =>
  <Wrapper>
    <List></List>
  </Wrapper>
);
