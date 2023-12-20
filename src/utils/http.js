import Axios from 'axios'
import Vue from 'vue'

const http = Axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API_URL,
  timeout: 10000
})

http.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

http.interceptors.response.use(
  res => {
    return res
  },
  error => {
    if (error.response && error.response.data) {
      Vue.prototype.$message.error(`${error}`)
    }
    return Promise.reject(error)
  }
)

export { http }
