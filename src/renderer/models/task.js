import { fetchList } from 'services/task';
const getInitialState = () => {
  return {
    tab: 'active',
  };
}
const maxCount = 10000;
export default {
  namespace: 'task',
  state: getInitialState(),
  reducers: {
    updateTab(state, {payload}) {
      return {
        ...state,
        tab: payload
      }
    }
  },
  effects: {
    *fetchList({ payload }, { call, put, select }) {
      let { tab, offset = 0, num = maxCount, keys } = payload;
      yield put({
        type: 'updateTab',
        payload: tab,
      })
      let params = keys ? [keys] : [];
      if (tab !== 'active') {
        params = [offset, num].concat(params);
      }
      let result = yield call(fetchList, {
        status: tab,
        params,
      });
      console.log('result:', result);
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        dispatch({
          type: 'task/fetchList',
          payload: {
            tab: 'active',
            params: []
          },
        })
        // let match = pathToRegexp('/config/:id?').exec(location.pathname);
      });
    }
  },
}
