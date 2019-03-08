const getInitialState = () => {
  return {
    tab: 'in-progress',
  };
}
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
}
