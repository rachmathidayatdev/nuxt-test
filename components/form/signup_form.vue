<template>
  <v-card class="mx-auto absolute-right--form" max-width="344">
    <v-container>
      <form class="form">
        <v-text-field
          v-model="fullName"
          class="mt-2"
          :error-messages="fullNameErrors"
          label="Full Name"
          required
          outlined
          dense
          @input="$v.fullName.$touch()"
          @blur="$v.fullName.$touch()"
        ></v-text-field>
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
          v-model="phone"
          class="mt-2"
          :error-messages="phoneErrors"
          label="Mobile number"
          required
          outlined
          dense
          @input="$v.phone.$touch()"
          @blur="$v.phone.$touch()"
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
        <v-text-field
          v-model="confirmPassword"
          class="mt-2"
          :error-messages="confirmPasswordErrors"
          :counter="6"
          label="Confirm Password"
          type="password"
          required
          outlined
          dense
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
        ></v-text-field>

        <v-btn
          class="mt-4 btn-social--media"
          outlined
          color="deep-orange accent-3"
          style="width: 220px;"
          @click="submit"
          ><span class="btn-item">Sign Up</span></v-btn
        >
        <div v-if="routeName !== 'signup'" class="mt-4">
          <p class="label-item">
            Are you a new user?
            <span class="label-item--link" @click="showLoginForm">Sign In</span>
          </p>
        </div>
      </form>
    </v-container>
  </v-card>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'
import maxLength from 'vuelidate/lib/validators/maxLength'

export default {
  mixins: [validationMixin],
  validations: {
    fullName: { required },
    email: { required, email },
    phone: {
      required,
      phoneValidate: (phone) => {
        const regexx = new RegExp(
          /\(?(?:\+62|62|0)(?:\d{2,3})?\)?[ .-]?\d{2,4}[ .-]?\d{2,4}[ .-]?\d{2,4}/g
        )
        return regexx.test(phone.toString())
      },
      maxLength: maxLength(13),
    },
    password: { required, minLength: minLength(6) },
    confirmPassword: {
      required,
      minLength: minLength(6),
      sameAs: sameAs('password'),
    },
  },
  data() {
    return {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    }
  },
  computed: {
    fullNameErrors() {
      const errors = []
      if (!this.$v.fullName.$dirty) return errors
      !this.$v.fullName.required && errors.push('Full Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
    phoneErrors() {
      const errors = []
      if (!this.$v.phone.$dirty) return errors
      !this.$v.phone.required && errors.push('Mobile number is required.')
      !this.$v.phone.phoneValidate &&
        errors.push('Mobile number format is not valid')
      this.$v.phone.$invalid &&
        errors.push('Mobile number must be 13 characters long')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      this.$v.password.$invalid &&
        errors.push('Password must be at least 6 characters long')
      return errors
    },
    confirmPasswordErrors() {
      const errors = []
      if (!this.$v.confirmPassword.$dirty) return errors
      !this.$v.confirmPassword.required &&
        errors.push('Confirm Password is required.')
      this.$v.confirmPassword.$invalid &&
        errors.push('Confirm Password must be at least 6 characters long')
      !this.$v.confirmPassword.sameAs &&
        errors.push('Confirm Password is not match.')
      return errors
    },
    routeName() {
      return this.$route.name
    },
  },

  methods: {
    showLoginForm() {
      this.$emit('showLoginForm', '')
    },
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        alert('error')
      } else {
        this.$store
          .dispatch('auth/signUp', {
            name: this.fullName,
            email: this.email,
            phoneNumber: this.phone,
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
  },
}
</script>
