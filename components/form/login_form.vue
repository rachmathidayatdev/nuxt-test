<template>
  <v-card class="mx-auto absolute-right--form" max-width="344">
    <v-container>
      <form class="form">
        <v-text-field
          v-model="email"
          class="mt-2"
          :error-messages="emailErrors"
          label="E-mail"
          required
          outlined
          dense
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          class="mt-2"
          :error-messages="passwordErrors"
          :counter="6"
          label="Password"
          type="password"
          required
          outlined
          dense
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>

        <v-btn
          class="mt-4 btn-social--media"
          outlined
          color="deep-orange accent-3"
          style="width: 100%;"
          @click="loginEmail"
          ><span class="btn-item">Sign in</span></v-btn
        >
        <p class="mt-8 text-line"><span>or</span></p>
        <v-btn
          class="mt-4 btn-social--media"
          color="dark"
          style="width: 100%;"
          @click="loginSocial('google')"
        >
          <v-icon left dark>mdi-google</v-icon>
          <span class="btn-item">Sign in with Google</span></v-btn
        >
        <v-btn
          class="mt-4 btn-social--media"
          color="dark"
          style="width: 100%;"
          @click="loginSocial('facebook')"
        >
          <v-icon left dark>mdi-facebook</v-icon>
          <span class="btn-item">Sign in with Facebook</span></v-btn
        >
        <div v-if="routeName !== 'signin'" class="mt-4">
          <p class="label-item">
            Are you a new user?
            <span class="label-item--link" @click="showSignupForm"
              >Sign Up</span
            >
          </p>
        </div>
      </form>
    </v-container>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email } from 'vuelidate/lib/validators'
export default {
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required, minLength: minLength(6) },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      this.$v.password.$invalid &&
        errors.push('Password must be at least 6 characters long')
      !this.$v.password.required && errors.push('Password is required.')
      return errors
    },
    routeName() {
      return this.$route.name
    },
  },
  methods: {
    showSignupForm() {
      this.$emit('showSignupForm', '')
    },
    loginEmail() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        alert('error')
      } else {
        this.$store
          .dispatch('auth/loginEmail', {
            email: this.email,
            password: this.password,
          })
          .then((resp) => {
            if (resp.status) {
              window.location.href = '/'
            } else {
              alert(resp.message)
            }
          })
      }
    },
    loginSocial(payload) {
      this.$store
        .dispatch('auth/loginSocial', {
          socialMediaType: payload,
          socialMediaToken: 'qwertyuiop123456',
        })
        .then((resp) => {
          if (resp.status) {
            window.location.href = '/'
          } else {
            alert(resp.message)
          }
        })
    },
  },
}
</script>
