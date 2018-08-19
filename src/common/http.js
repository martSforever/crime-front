import axios from 'axios'
import CONST from "./const";
import {showMessage} from "./message";

let http = {
  async get(url, params) {
    return request('get', url, params)
  },
  async post(url, params) {
    return request('post', url, params)
  },
}

async function request(method, url, params) {
  try {
    let resp = await axios[method](`${CONST.prefixUrl}/${url}`, (method === 'get') ? {params} : params)
    let data = resp.data
    if (!!data && !!data.success) {
      return resp.data
    } else {
      showMessage(data.message)
      return null
    }
  } catch (e) {
    console.error(e)
    showMessage('请求失败！')
    return null
  }
}

export default http
