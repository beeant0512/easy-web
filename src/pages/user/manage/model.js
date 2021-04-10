import { query, add, get, remove, update, validate } from './service';

const Model = {
  namespace: 'user',
  state: {
    data: { list: [], pagination: {} },
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      if (response.success) {
        console.log(response);
        yield put({
          type: 'changeState',
          payload: { data: response.data },
        });
      } else {
        yield put({
          type: 'changeState',
          payload: { data: { list: [], pagination: {} } },
        });
      }
      if (callback) {
        callback(response);
      }
    },
    *add({ payload, callback }, { call }) {
      const response = yield call(add, payload);
      if (callback) {
        callback(response);
      }
    },
    *get({ payload, callback }, { call }) {
      const response = yield call(get, payload);
      if (callback) {
        callback(response);
      }
    },
    *update({ payload, callback }, { call }) {
      const response = yield call(update, payload);
      if (callback) {
        callback(response);
      }
    },
    *validate({ payload, callback }, { call }) {
      const response = yield call(validate, payload);
      if (callback) {
        callback(response);
      }
    },
    *remove({ payload, callback }, { call }) {
      const response = yield call(remove, payload);
      if (callback) {
        callback(response);
      }
    },
  },
  reducers: {
    changeState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
