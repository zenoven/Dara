import { connect } from 'dva';
import { remote } from 'electron';
import is from 'electron-is';
import Wrapper from 'layout/wrapper';

const {
  application,
  window
} = remote.getGlobal('services');

export default connect(({task}) => ({task}))((props) =>
  <Wrapper>

  </Wrapper>
);
