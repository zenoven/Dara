import { connect } from 'dva';
import { remote } from 'electron';
import Wrapper from 'layout/wrapper';
import List from 'layout/list';

const {
  window
} = remote.getGlobal('services');

export default connect(({ task }) => ({ task }))((props) =>
  <Wrapper
    noSidebar
    onClick={() => {
      window.toggleNewTaskModal(false);
    }}
  >
    hello

  </Wrapper>
);
