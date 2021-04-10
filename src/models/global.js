import { isLogin, menus } from '@/services/authroity';

const GlobalModel = {
  namespace: 'global',
  state: {
    collapsed: false,
    isLogin: false,
  },
  effects: {
    *isLogin(_, { call, put }) {
      const response = yield call(isLogin);
      yield put({
        type: 'changeState',
        payload: { isLogin: response.data },
      });
    },
    *menus({ callback }, { call }) {
      const response = yield call(menus);
      callback(response);
    },
  },
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload };
    },
    changeLayoutCollapsed(
      state = {
        notices: [],
        collapsed: true,
      },
      { payload },
    ) {
      return { ...state, collapsed: payload };
    },
  },
};
export default GlobalModel;
