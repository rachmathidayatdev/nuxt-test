const cookieparser = process.server ? require('cookieparser') : undefined

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      const token = parsed.nuxtToken

      if (token) {
        commit('auth/IS_AUTHENTICATE', true)
      } else {
        commit('auth/IS_AUTHENTICATE', false)
      }
    }
  },
}
