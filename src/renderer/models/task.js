import { fetchList, fetchStat, fetchNotificationList } from 'services/task';
import { remote } from 'electron';
import { statusList } from 'layout/sidebar';

const { aria2 } = remote.getGlobal('services');

const getInitialState = () => {
  return {
    tab: 'active',
    list: statusList.reduce((result, {key}) => {
      result[key] = [];
      return result;
    }, {}),
    init: true,
    stat: {
      numActive: 0,
      numStopped: 0,
      numStoppedTotal: 0,
      numWaiting: 0,
      downloadSpeed: 0,
      uploadSpeed: 0,
    },
    notificationList: [],
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
      if (result) {
        yield put({
          type: 'update',
          payload: {
            list: {
              ...state.list,
              [tab]: result,
             },
          },
        })
      }
    },

    *fetchAllList({ payload = {} }, { call, put, select, all }) {
      return yield all(statusList.map(({key}) => {
        return put({
          type: 'fetchList',
          tab: key
        });
      }))
    },

    *fetchStat({ payload }, { call, put, select }) {
      let result = yield call(fetchStat, payload);
      if (result) {
        yield put({
          type: 'update',
          payload: {
            stat: result,
          },
        })
      }
    },

    *fetchNotificationList({ payload }, { call, put, select }) {
      let result = yield call(fetchNotificationList);
      if (result) {
        yield put({
          type: 'update',
          payload: {
            notificationList: result,
          },
        });
        return result;
      } else {
        return yield new Promise.reject(new Error('fetchNotificationList error'));
      }
    },

    *refresh({ payload }, { call, put, select, all }) {
      let { init } = yield select(state => state.task);
      if (init) {
        return yield all([
          put({ type: 'fetchAllList', payload }),
          put({ type: 'fetchStat' }),
          put({ type: 'update', payload: {init: false} }),
        ]);
      }

    },

    *updateAsync({ payload }, { call, put, select }) {
      return yield put({ type: 'update', payload });
    },

    *changeTab({ payload }, { call, put, select }) {
      yield put({ type: 'update', payload });
      yield put({ type: 'fetchList', payload });
    },

    *add({ payload }, { call, put, select }) {
      let { type = 'uri', params } = payload;
      yield call((x) => aria2.call(`add${type.toUpperCase()}`, x), params);
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((location) => {
        // refresh at start up
        dispatch({
          type: 'refresh',
        });
        // refresh on receive notifications
        dispatch({
          type: 'fetchNotificationList',
        }).then((notificationList) => {
          notificationList.forEach(notification => {
            aria2.on(notification, (params) => {
              dispatch({
                type: 'refresh',
              });
             });
          });
        })
        // let match = pathToRegexp('/config/:id?').exec(location.pathname);
      });
    }
  },
}
