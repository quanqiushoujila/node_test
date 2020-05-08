import axios from 'axios'

axios.defaults.timeout = 30000
axios.defaults.baseURL = '/api'
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json'
export default axios