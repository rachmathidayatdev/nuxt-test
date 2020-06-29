<template>
  <v-container style="margin-top: 80px; min-height: calc(100vh - 135px);">
    <h2 class="title mtm-20 mb-6">Sign Up</h2>
    <p class="mb-6">
      Have an account? <span><nuxt-link to="/signin">Sign In</nuxt-link></span>
    </p>
    <signup-form />
  </v-container>
</template>

<script>
import signupForm from '@/components/form/signup_form'
export default {
  components: {
    signupForm,
  },
  head: {
    title: 'Sign Up page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Sign Up page description',
      },
    ],
    noscript: [{ innerHTML: 'Body No Scripts', body: true }],
    script: [],
  },
}
</script>
