import axios from 'axios'
import { message } from 'antd'
import { devProt, prodProt } from './'

/**
 * 提示函数
 * 禁止点击蒙层、显示一秒后关闭
 */
const tip = msg => {
  message.error(msg);
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    case 404:
      tip('请求的资源不存在')
      break
    default:
      console.log(other)
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12,
  baseURL: process.env.NODE_ENV === 'development' ? devProt : prodProt
})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'
/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  config => {
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => (res.status === 200 ? Promise.resolve(res) : Promise.reject(res)),
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      tip('网络不通畅, 请稍后再试')
    }
  }
)

export default instance
