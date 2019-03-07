import { connect } from 'dva';
import { remote } from 'electron';
import is from 'electron-is';

const {
  application,
  window
} = remote.getGlobal('services')

export default connect(state => ({
  g: state.g,
}))((props) =>
  <div style={{ textAlign: 'center' }}>
    <h2>Data Test: {props.g}</h2>
    <h2>is.osx(): {JSON.stringify(is.osx())}</h2>
    <button onClick={() => window.create()}>new window</button>
  </div>
);
