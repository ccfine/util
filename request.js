import axios from "axios"
import { message } from "antd"

message.config({
  top: 30,
  duration: 3,
  maxCount: 3
})

const service = axios.create({
  timeout: 5000
})

//请求拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  message.error("网络连接失败")
  return Promise.reject(error)
})

//响应拦截器
service.interceptors.response.use(response => {
  const { status, statusText, data } = response
  return Promise.resolve({
    success: true,
    status,
    statusText,
    data
  })
}, error => {
  //如果请求花费的时间超过延迟的时间，那么请求会被终止
  if (error.code === "ECONNABORTED" && error.message.indexOf("timeout") !== -1) {
    message.error("请求超时")
    return Promise.reject({
      success: false,
      status: error.code,
      statusText: "请求超时"
    })
  } else {
    let { status, statusText, data } = error.response
    switch (status) {
      case 400:
        statusText = "请求错误"
        break
      case 401:
        statusText = "没有权限"
        break
      case 403:
        statusText = "拒绝访问"
        break
      case 404:
        statusText = `请求地址出错：${error.response.config.url}`
        break 
      case 406:
        statusText = "请求的格式不可得"
        break
      case 408:
        statusText = "请求超时"
        break
      case 410:
        statusText = "请求的资源已被永久删除"
        break 
      case 422:
        statusText = "创建对象时，验证错误"
        break
      case 500:
        statusText = "服务器内部错误"
        break
      case 501:
        statusText = "服务未实现"
        break
      case 502:
        statusText = "网关错误"
        break
      case 503:
        statusText = "服务不可用"
        break
      case 504:
        statusText = "网关超时"
        break
      case 505:
        statusText = "http版本不受支持"
        break
      default:
    }
    const msg = data.message || statusText
    message.error(msg)
    return Promise.reject({
      success: false,
      status,
      statusText: msg
    })
  }
})

const fetch = options => {
  const { method = "get", data } = options
  switch (method.toLowerCase()) {
    case "get":
      return service({
        ...options,
        method: method.toLowerCase(),
        params: data
      })
    default:
      return service({
        ...options,
        method: method.toLowerCase()
      })
  }
}

//封装axios
const request = options => {
  return new Promise((resolve, reject) => {
    fetch(options).then(res =>
      resolve(res)
    ).catch(error =>
      reject(error)
    )
  })
}

export default request