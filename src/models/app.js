import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { getRegisterCaptcha } from '../services/app';
import { createAction, net } from '@/utils';
import { message } from 'antd';

export default {
  namespace: 'app',

  state: {
    status: undefined,
    publicKey: '',
  },

  effects: {
    *getRegisterCaptcha({ payload }, { call, put }) {
      const response = yield call(getRegisterCaptcha, payload);
      if (net(response)) {
        yield put(createAction('updateState')({ publicKey: response.data }));
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};