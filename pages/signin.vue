<template>
  <v-container style="margin-top: 80px; min-height: calc(100vh - 135px);">
    <h2 class="title mtm-20">Sign In</h2>
    <p class="mb-6">
      Don't have account?
      <span><nuxt-link to="/signup">Sign Up</nuxt-link></span>
    </p>
    <login-form />
  </v-container>
</template>

<script>
import loginForm from '@/components/form/login_form'
export default {
  components: {
    loginForm,
  },
}
</script>
