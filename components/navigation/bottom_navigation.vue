<template>
  <v-bottom-navigation
    v-if="screenSize === 'xs'"
    :value="activeBtn"
    grow
    color="teal"
  >
    <v-btn @click="$router.push({ name: 'index' })">
      <span>Home</span>
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-btn @click="$router.push({ name: 'unit' })">
      <span>Unit Listing</span>
      <v-icon>mdi-clipboard-list</v-icon>
    </v-btn>

    <v-btn
      @click="isAuthenticate ? signOut() : $router.push({ name: 'signin' })"
    >
      <span>{{ isAuthenticate ? 'Sign Out' : 'Sign in' }}</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  props: {
    activeBtn: {
      default: 0,
      type: Number,
    },
    screenSize: {
      default: 'sm',
      type: String,
    },
  },
  computed: {
    isAuthenticate() {
      return this.$store.state.auth.isAuthenticate
    },
  },
  methods: {
    signOut() {
      this.$store.dispatch('auth/signOut').then((resp) => {
        if (resp.status) {
          location.reload()
        }
      })
    },
  },
}
</script>
