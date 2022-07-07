/**
 * axios
 * 1. 對應該 source 的 axios 設定，例如利用攔截器更改回傳的資料格式（response_wrapper）、統一例外的處理方法
 * 2. 封裝 http 方法
 */

import axios from 'axios'

export const cb_axios = axios.create({
  baseURL: import.meta.env.VITE_APP_SERVER_HOST
})

cb_axios.interceptors.response.use(res => {
  return res
})
cb_axios.defaults.headers.get['Accept'] = 'application/json'
cb_axios.defaults.headers.post['Content-Type'] = 'application/json'
cb_axios.defaults.withCredentials = true
cb_axios.defaults.xsrfCookieName = 'csrftoken'
cb_axios.defaults.xsrfHeaderName = 'X-CSRFToken'
cb_axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
cb_axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('google_bearer_access_token')

function response_wrapper(response) {
  return {
    'data': response.data.data,
    'message': response.data.message,
    'code': response.status
  }
}

// request 攔截器
cb_axios.interceptors.request.use((config) => {
    return config
  }, (error) => {
    return Promise.reject(error)
  }
)

// response 攔截器
cb_axios.interceptors.response.use((response) => {
    return response_wrapper(response)
  }, (error) => {
    console.error(error)

    if (error.response) {
      console.warn(response_wrapper(error.response))
    }

    if (!window.navigator.onLine) {
      alert("網路出了點問題，請重新連線後重整網頁")
      return
    }

    return Promise.reject(response_wrapper(error.response))
  }
)

// 封裝 http 方法
export const req = (method, url, data=null) => {
  method = method.toLowerCase()
  switch (method) {
    case "post":
      return cb_axios.post(url, data)
    case "get":
      return cb_axios.get(url, { params: data })
    case "delete":
      return cb_axios.delete(url, { data: data })
    case "put":
      return cb_axios.put(url, data)
    case "patch":
      return cb_axios.patch(url, data)
    default:
      console.log(`未知的 http method: ${method}`)
      return false
  }
}
