import axios from 'axios'
import CONST from "./const";

let http = {
  async get(url, params) {
    try {
      let resp = await axios.get(`${CONST.prefixUrl}/${url}`, {params})
      return resp.data
    } catch (e) {
      console.error(e)
      return null
    }
  },
  async post(url, param) {
    try {
      let resp = await axios.post(`${CONST.prefixUrl}/${url}`, param)
      return resp.data
    } catch (e) {
      console.error(e)
      return null
    }
  },
}

export default http
