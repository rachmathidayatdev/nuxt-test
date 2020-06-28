import Cookies from 'js-cookie'
import API from '@/utils/api'

export const state = () => ({
  isAuthenticate: false,
  userData: {},
  message: '',
})

export const mutations = {
  AUTH_SUCCESS(state, payload) {
    state.isAuthenticate = true
    state.userData = payload.data
    state.message = payload.meta.message
  },
  AUTH_FAILED(state, payload) {
    state.isAuthenticate = false
    state.message = payload.message
  },
  IS_AUTHENTICATE(state, payload) {
    state.isAuthenticate = payload
  },
}

export const getters = {
  getToken() {
    return Cookies.get(`nuxtToken`)
  },
}

export const actions = {
  loginEmail: ({ commit }, payload) => {
    const login = new Promise((resolve, reject) => {
      API.post(`signin-email`, payload)
        .then((response) => {
          // response dari apiarynya gak bisa di parse karna ada ',' di attibut token. jadi di dummyin responsenya
          const data = JSON.parse(`{
                "meta": {
                    "message": "sign in success"
                },
                "data": {
                    "id": 1,
                    "name": "User Name",
                    "email": "email@mail.com",
                    "photoUrl": "https://static.thenounproject.com/png/17241-200.png",
                    "token": "123456789poiuytrewqsdfghjkl"
                }
            }`)

          if (response.status === 200) {
            commit('AUTH_SUCCESS', data)

            Cookies.set(`nuxtToken`, data.data.token)

            resolve({ status: true, data })
          } else {
            commit('AUTH_FAILED', response.message)
            resolve({ status: false })
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

    return login
  },
  loginSocial: ({ commit }, payload) => {
    const login = new Promise((resolve, reject) => {
      API.post(`signin-social`, payload)
        .then((response) => {
          // response dari apiarynya gak bisa di parse karna ada ',' di attibut token. jadi di dummyin responsenya
          const data = JSON.parse(`{
                "meta": {
                    "message": "sign in success"
                },
                "data": {
                    "id": 1,
                    "name": "User Name",
                    "email": "email@mail.com",
                    "photoUrl": "https://static.thenounproject.com/png/17241-200.png",
                    "token": "123456789poiuytrewqsdfghjkl"
                }
            }`)

          if (response.status === 200) {
            commit('AUTH_SUCCESS', data)

            Cookies.set(`nuxtToken`, data.data.token)

            resolve({ status: true, data })
          } else {
            commit('AUTH_FAILED', response.message)
            resolve({ status: false })
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

    return login
  },
  signUp: ({ commit }, payload) => {
    const signUp = new Promise((resolve, reject) => {
      API.post(`signup`, payload)
        .then((response) => {
          // response dari apiarynya gak bisa di parse karna ada ',' di attibut token. jadi di dummyin responsenya
          const data = JSON.parse(`{
            "meta": {
                "message": "sign up success"
            },
            "data": {
                "id": 1,
                "name": "User Name",
                "email": "email@mail.com",
                "photoUrl": "https://static.thenounproject.com/png/17241-200.png",
                "token": "123456789poiuytrewqsdfghjkl"
            }
        }`)

          if (response.status === 200) {
            commit('AUTH_SUCCESS', data)

            Cookies.set(`nuxtToken`, data.data.token)

            resolve({ status: true, data })
          } else {
            commit('AUTH_FAILED', response.message)
            resolve({ status: false })
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

    return signUp
  },
  signOut: ({ commit }) => {
    const signOut = new Promise((resolve, reject) => {
      commit('IS_AUTHENTICATE', false)

      Cookies.remove(`nuxtToken`)

      console.log('asdasdasdas')

      resolve({ status: true })
    })

    return signOut
  },
}
