import { fetchList, fetchStat } from 'services/task';
const getInitialState = () => {
  return {
    tab: 'active',
    list: [],
    stat: {
      numActive: 0,
      numStopped: 0,
      numStoppedTotal: 0,
      numWaiting: 0,
      downloadSpeed: 0,
      uploadSpeed: 0,
    },
  };
}
const maxCount = 10000;
export default {
  namespace: 'task',
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
      let state = yield select(state => state.task);
      let { tab, offset = 0, num = maxCount, keys } = payload;
      tab = tab || state.tab;
      let params = keys ? [keys] : [];
      if (tab !== 'active') {
        params = [offset, num].concat(params);
      }
      let result = yield call(fetchList, {
        status: tab,
        params,
      });
      console.log('fetchList result:', result);
      if (result) {
        yield put({
          type: 'update',
          payload: {
            list: result,
          },
        })
      }
    },

    *fetchStat({ payload }, { call, put, select }) {
      let result = yield call(fetchStat, payload);
      console.log('fetchStat result:', result);
      if (result) {
        yield put({
          type: 'update',
          payload: {
            stat: result,
          },
        })
      }
    },

    *refresh({ payload }, { call, put, select, all }) {
      return yield all([
        put({type: 'fetchList', payload}),
        put({type: 'fetchStat'}),
      ])
    },

    *updateAsync({ payload }, { call, put, select }) {
      return yield put({ type: 'update', payload });
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        dispatch({
          type: 'refresh',
        })
        // let match = pathToRegexp('/config/:id?').exec(location.pathname);
      });
    }
  },
}
