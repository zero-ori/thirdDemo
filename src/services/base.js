import axios from 'axios';
import Cookie from 'js-cookie';
import { MODELSEARCH } from './constant';
import _ from 'lodash';

export const http = axios.create({
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  withCredentials: true,
});

export const plainHttp = axios.create({
  headers: {
    common: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  },
  withCredentials: true,
});

plainHttp.interceptors.request.use((config) => {
  if (Cookie.get('user_ticket')) {
    config.headers.common.Authorization = 'Bearer ' + Cookie.get('user_ticket');
    Cookie.set('apiToken', Cookie.get('user_ticket'));
  }
  return config;
});

plainHttp.interceptors.response.use((resp) => {
  let {status, data} = resp;
  if (status === 200 && (data.status === 'success' || data.errno === 200 || data.code === 0)) {
    if (!data.data || (data.data && !data.data.errorCode)) {
      return data;
    }
  }
});

export function responseErrorHandle(cb, loginFailed) {
  function getRes(obj) {
    const res = obj.response;
    if (res) {
      return res;
    }
    return obj;
  }

  http.interceptors.request.use((config) => {
    if (Cookie.get('user_ticket')) {
      config.headers.common.Authorization = 'Bearer ' + Cookie.get('user_ticket');
      Cookie.set('apiToken', Cookie.get('user_ticket'));
    }

    if (config.url.includes('ilab')) {
      if (config.method === 'get') {
        config.params = { ...config.params, ...MODELSEARCH};
      } else if (config.method === 'post') {
        config.data = { ...config.data, ...MODELSEARCH };
      }
    }

    return config;
  });

  http.interceptors.response.use(
    (resp) => {
      const { status, data } = getRes(resp);
      if (_.get(data, 'data.errorCode') === 401 || data.code === 401) {
        console.log('未登录');
        loginFailed();
      }

      // status 非 200 和 errorCode 有值，都走错误处理
      if (
        status === 200
        && (data.status === 'success' || data.errno === 200 || data.code === 0)
      ) {
        if (!data.data || (data.data && !data.data.errorCode)) {
          return data.data;
        }
      }

      let isShowNormalError = true;
      const hideNormalError = () => (isShowNormalError = false);

      setTimeout(() => {
        if (isShowNormalError) {
          cb({...data, errorMessage: data.data && data.data.errorMessage});
        }
      });

      // 如果定制处理错误，catch 里调用 hideNormalError，之后写定制处理即可。
      return Promise.reject({ data, hideNormalError });
    },
    (error) => {
      let isShowNormalError = true;
      const hideNormalError = () => isShowNormalError = false;

      const { status, data } = getRes(error);
      if (status === 401 || _.get(data, 'data.errorCode') === 401 || data.code === 401) {
        loginFailed();
      }

      setTimeout(() => {
        if (isShowNormalError) {
          cb(error.response.data);
        }
      })

      return Promise.reject({ ...error.response, hideNormalError })
    },
  );
}

/**
 * export function getItems() {
 *   return delay(() => ({data: {}}));
 * }
 */
export function delayIt(fn, { delay = 100 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(fn());
      } catch (ex) {
        reject(ex);
      }
    }, delay);
  });
}

export function isProd() {
  return process.env.NODE_ENV === 'production';
}

/* service mock */
class Mock {
  static get() {
    return false;
  }
}

if (process.env.NODE_ENV !== 'production') {
  Mock.KEY = 'useMock';
  Mock.get = function () {
    return Cookie.get(Mock.KEY) === '1';
  };

  Mock.set = function (val) {
    if (val) {
      Cookie.set(Mock.KEY, '1', { path: '/' });
    } else {
      Cookie.remove(Mock.KEY, { path: '/' });
    }

    window.location.reload();
  };
}

const useMock = Mock.get;

// 如果定义了全局变量 PASSPORT_URL, 那么他的优先级比 node.js 环境变量高 .
const url = (typeof window.PASSPORT_URL !== 'undefined' && window.PASSPORT_URL) ? window.PASSPORT_URL : process.env.VUE_APP_PASSPORT_URL;

export function installPassport() {
  let app = document.getElementById('app');
  let div = document.createElement('div');
  app.parentNode.insertBefore(div, app);
  div.innerHTML = '<button style="position: fixed; left: -1000px; opacity: 0" id="passport-login" data-client="dsd"></button>';

  // passport.login.js 有一些限制，必须在 domready 之前执行
  document.write(`<script src="${url}"></script>`);
}

export { Mock, useMock, Cookie};
