import API from '@/utils/api'

export const state = () => ({
  message: '',
  bannerList: [],
  locationsList: [],
  recommendationList: [],
  unitListingList: [],
})

export const mutations = {
  HOME_SUCCESS(state, payload) {
    state.message = 'success'
    state.bannerList = payload.banners
    state.locationsList = payload.locationsList
    state.recommendationList = payload.recommendationList
  },
  HOME_FAILED(state, payload) {
    state.message = payload
  },
  UNIT_SUCCESS(state, payload) {
    state.message = 'success'
    state.unitListingList = payload.data
  },
  UNIT_FAILED(state, payload) {
    state.message = payload
  },
}

export const getters = {
  getBanner(state) {
    return state.bannerList
  },
  getLocationsList(state) {
    return state.locationsList
  },
  getRecommendedList(state) {
    return state.recommendationList
  },
  getUnitListingList(state) {
    return state.unitListingList
  },
}

export const actions = {
  fetchHomeData: ({ commit }) => {
    const home = new Promise((resolve, reject) => {
      API.get(`home`)
        .then((response) => {
          if (response.status === 200) {
            commit('HOME_SUCCESS', response.data.data)

            resolve({ status: true, data: response.data.data })
          } else {
            commit('HOME_FAILED', 'failed')
            resolve({ status: false })
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

    return home
  },
  fetchUnitListing: ({ commit }) => {
    const unit = new Promise((resolve, reject) => {
      API.get(`list`)
        .then((response) => {
          // response dari apiarynya gak bisa di parse karna ada ',' di attibut pagination. jadi di dummyin responsenya
          const data = JSON.parse(`{
            "meta": {
              "seo": {
                "title": "Unit Listing page",
                "desc": "This is seo description for unit listing page"
              },
              "pagination": {
                "page": 1,
                "perPage": 10,
                "totalPage": 10,
                "totalData": 100
              }
            },
            "data": [
                {
                  "id": 1,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 2,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 3,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 4,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 5,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 6,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 7,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 8,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 9,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 10,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 11,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 12,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 13,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 14,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 15,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 16,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 17,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 18,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 19,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 20,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 21,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 22,
                  "name": "Pasar Minggu Calm Kuningan",
                  "slug": "pasar-minggu-calm-kuningan",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/0fc09c75-a2c8-3d09-8959-a7a60586e721_49dc0e52-53c2-3b91-a722-6105c84393e0.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 10,
                  "rating": 5,
                  "address": "Jl D IV No.5 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4900000
                },
                {
                  "id": 23,
                  "name": "RoomMe The Nine Kuningan",
                  "slug": "the-nine",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 0,
                  "rating": 5,
                  "address": "Jl D IV No.1 Kebon baru Jakarta Selatan",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                },
                {
                  "id": 24,
                  "name": "RoomMe Tangerang",
                  "slug": "the-tangerang",
                  "image": {
                    "url": "https://cdn.roomme.id/medium/fa87dcf1-117c-3cd6-8cea-6a7e0ff815ac_0aa4bd51-5ef3-3278-afd3-6207a0894e9b.jpg",
                    "alt": "RoomMe"
                  },
                  "discount": 90,
                  "rating": 0,
                  "address": "Jl No.122 Kebon baru Jakarta Pusat",
                  "originalPrice": 4900000,
                  "sellingPrice": 4500000
                }
              ]
          }`)
          if (response.status === 200) {
            commit('UNIT_SUCCESS', data)

            resolve({ status: true, data })
          } else {
            commit('UNIT_FAILED', 'failed')
            resolve({ status: false })
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

    return unit
  },
}
