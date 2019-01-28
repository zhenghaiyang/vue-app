import axios from 'axios';
import Router from 'vue-router'
// import {message} from 'iview';
import {AlertModule } from 'vux'
import globalConfig from '@/lib/globalConfig.js';

console.log("globalConfig",globalConfig)

const base =globalConfig.apiUrl;
// 超时设定
axios.defaults.timeout = 15000;
axios.interceptors.request.use((config) => {
    return config;
}, (err) => {
    AlertModule.show({
      title:"提示",
      content:'请求超时'
    })
    return Promise.resolve(err);
});

// http response 拦截器
axios.interceptors.response.use((response) => {
    const res = response.data;
    switch (res.code) {
        case 200:
            res.success = true;
            return res;
        case 401:
            // 未登录 清除已登录状态
            setStore('accessToken', '');
            Router.push('/login');
            break;
        case 403:
            // 没有权限
            if (res.msg !== null) {
              AlertModule.show({
                title:"提示",
                content:"没权限"
              })
            } else {
                AlertModule.show({
                  title:"提示",
                  content:"未知错误"
                })
            }
            break;
        case 500:
            // 错误
            if (res.msg !== null) {
                AlertModule.show({
                  title:"提示",
                  content:res.msg
                })
            } else {
                AlertModule.show({
                  title:"提示",
                  content:"未知错误"
                })
            }
            break;
        default:
            res.success = false;
            if (res.msg) {
                AlertModule.show({
                  title:"提示",
                  content:"未知错误"
                })
            }
            return Promise.reject(res);
    }
    return res;
}, (err) => {
    // 返回状态码不为200时候的错误处理
    AlertModule.show({
      title:"提示",
      content:err.toString()
    })
    return Promise.reject(err);
});

export const getRequest = (url, params) => {
    const accessToken = getStore('accessToken');
    return axios({
        method: 'get',
        url: `${base}${url}`,
        params: params,
    });
};

export const formPostRequest = (url, params) => {
    const accessToken = getStore('accessToken');
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = '';
            for (const it in data) {
              if (data.hasOwnProperty(it)) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
              }
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken,
        },
    });
};

export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: `${base}${url}`,
        data: params,
    });
};

export const putRequest = (url, params) => {
    const accessToken = getStore('accessToken');
    return axios({
        method: 'put',
        url: `${base}${url}`,
        data: params,
        transformRequest: [function(data) {
            let ret = '';
            for (const it in data) {
              if (data.hasOwnProperty(it)) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
              }
            }
            return ret;
        }],
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accessToken': accessToken,
        },
    });
};

export const deleteRequest = (url, params) => {
    const accessToken = getStore('accessToken');
    return axios({
        method: 'delete',
        url: `${base}${url}`,
        params: params,
    });
};

export const uploadFileRequest = (url, params) => {
    const accessToken = getStore('accessToken');
    return axios({
        method: 'post',
        url: `${base}${url}`,
        params: params,
        headers: {
            'accessToken': accessToken,
        },
    });
};

// 用户请求本地json
export const mockLocalhostJson = (url) => {
  // const baseurl = 'http://localhost:9090';
  return axios.get(`${url}`);
};
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}
