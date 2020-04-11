import axios from 'axios'

axios.defaults.withCredentials = false

const service = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 5000
})

service.interceptors.request.use(
  config => config,
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.data.code !== 0) {
      console.log(response.data.errorMsg)
      return Promise.reject(response)
    } else {
      return response
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
