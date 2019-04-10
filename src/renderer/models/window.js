import { remote } from 'electron';

const { window } = remote.getGlobal('services');

const getInitialState = () => {
  return {
    list: [],
    currentID: null, // 当前窗口 ID
    newTaskID: null, // 新任务窗口 ID
  };
}
export default {
  namespace: 'window',
  state: getInitialState(),
  reducers: {
    update(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *fetchList({ payload = {} }, { call, put, select }) {
      let result = yield call(window.getAllWindows);
      if (result) {
        yield put({
          type: 'update',
          payload: {
            list: result,
          },
        })
      }
    },


  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        dispatch({
          type: 'fetchList',
        });
      });
    }
  },
}
