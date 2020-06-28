import axios from 'axios'
// import store from '@/store/index'

axios.defaults.baseURL = 'https://private-94343-roommetest.apiary-mock.com/'
axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  (response) => {
    if (!response.headers.Authorization) {
      //   const token = store.state.auth.accessToken.token
      const token = ''

      if (token) {
        response.headers.Authorization = `Bearer ${token}`
      }
    }

    return response
  },
  (error) => Promise.reject(error)
)

export default class API {
  static get(path, options = {}) {
    return axios.get(path, { ...options })
  }

  static post(path, data = {}, options = {}) {
    return axios.post(path, data, { ...options })
  }

  static put(path, data = {}, options = {}) {
    return axios.put(path, data, { ...options })
  }

  static delete(path, options = {}) {
    return axios.delete(path, { ...options })
  }

  static all(path) {
    return axios.all(path)
  }

  static spread(param) {
    return axios.spread(param)
  }
}
