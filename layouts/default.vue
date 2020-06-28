<template>
  <v-app v-resize="onResize" light>
    <div class="overflow-hidden">
      <!-- appbar -->
      <v-app-bar absolute color="white" scroll-target="#scrolling-techniques">
        <v-container class="appbar-custom">
          <div>
            <nuxt-link
              v-if="routeName === 'signin' || routeName === 'signup'"
              to="/"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </nuxt-link>
            <img
              v-else
              src="https://cdn.roomme.id/icons/logoroommemain.png"
              height="30px"
              width="100px"
              @click="$router.push({ name: 'index' })"
            />
          </div>

          <v-spacer></v-spacer>

          <div
            v-if="
              routeName !== 'signin' &&
              routeName !== 'signup' &&
              screenSize !== 'xs'
            "
          >
            <!-- <v-app-bar-nav-icon
              v-if="screenSize === 'xs'"
              @click="drawer = true"
            ></v-app-bar-nav-icon> -->
            <div v-click-outside="hideForm" class="relative">
              <v-btn
                class="ma-2"
                outlined
                color="deep-orange accent-3"
                @click="isAuthenticate ? signOut() : showForm()"
                >{{ isAuthenticate ? 'Sign Out' : 'Sign in' }}</v-btn
              >
              <div v-if="showFormData">
                <login-form
                  v-show="showLogin"
                  @showSignupForm="showSignupForm"
                />
                <signup-form
                  v-show="showSignup"
                  @showLoginForm="showLoginForm"
                />
              </div>
            </div>
          </div>
        </v-container>
      </v-app-bar>
      <!-- sampai sini -->

      <!-- navigation drawer -->
      <!-- <v-navigation-drawer v-model="drawer" absolute temporary clipped-right>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item
              @click="
                isAuthenticate ? signOut() : $router.push({ name: 'signin' })
              "
            >
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>{{
                isAuthenticate ? 'Sign Out' : 'Sign in'
              }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer> -->
      <!-- sampai sini -->

      <v-sheet
        id="scrolling-techniques"
        class="overflow-y-auto"
        :max-height="
          screenSize === 'xs' ? 'calc(100vh - 55px)' : 'calc(100vh - 0px)'
        "
      >
        <v-main>
          <nuxt />
        </v-main>

        <div
          v-if="routeName !== 'signin' && routeName !== 'signup'"
          class="footer-container"
        >
          <v-container class="pt-10 pb-10">
            <v-row>
              <v-col sm="4">
                <img
                  src="https://roomme.id/public/img/f166a9a.png"
                  height="88px"
                />
              </v-col>
              <v-col sm="2" class="footer-content">
                <h2 class="text-white">
                  RoomMe
                </h2>
                <label class="text-brown">About Us</label>
                <label class="text-brown">About Us</label>
              </v-col>
              <v-col sm="2" class="footer-content">
                <h2 class="text-white">
                  Our Terms
                </h2>
                <label class="text-brown">FAQ</label>
                <label class="text-brown">Terms & Conditions</label>
                <label class="text-brown">Terms of Use</label>
                <label class="text-brown">Disclaimer</label>
                <label class="text-brown">Privacy Policy</label>
              </v-col>
              <v-col sm="3" class="footer-content">
                <h2 class="text-white">
                  Follow Us
                </h2>
                <div class="pt-1">
                  <img
                    src="https://roomme.id/public/img/062936f.png"
                    height="30px"
                  />
                  <img
                    src="https://roomme.id/public/img/dd895c4.png"
                    height="30px"
                  />
                  <img
                    src="https://roomme.id/public/img/3ae587d.png"
                    height="30px"
                  />
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </v-sheet>

      <!-- bottom nav -->
      <bottom-navigation :active-btn="activeBtn" :screen-size="screenSize" />
      <!-- sampai sini -->
    </div>
  </v-app>
</template>

<script>
import loginForm from '@/components/form/login_form'
import signupForm from '@/components/form/signup_form'
import bottomNavigation from '@/components/navigation/bottom_navigation'
export default {
  components: {
    loginForm,
    signupForm,
    bottomNavigation,
  },
  data() {
    return {
      showFormData: false,
      showLogin: false,
      showSignup: false,
      width: 0,
      screenSize: 'sm',
      drawer: false,
    }
  },
  computed: {
    routeName() {
      return this.$route.name
    },
    isAuthenticate() {
      return this.$store.state.auth.isAuthenticate
    },
    activeBtn() {
      let active = 0
      if (this.$route.name === 'index') active = 0
      else if (this.$route.name === 'unit') active = 1
      else active = 2

      return active
    },
  },
  methods: {
    showLoginForm() {
      this.showSignup = false
      this.showLogin = true
    },
    showSignupForm() {
      this.showLogin = false
      this.showSignup = true
    },
    showForm() {
      this.showFormData = !this.showFormData
      this.showLogin = true
      this.showSignup = false
    },
    hideForm() {
      this.showFormData = false
      this.showLogin = false
      this.showSignup = false
    },
    onResize() {
      if (window.innerWidth > 1904) {
        this.screenSize = 'xl'
      } else if (window.innerWidth > 1264 && window.innerWidth < 1904) {
        this.screenSize = 'lg'
      } else if (window.innerWidth > 960 && window.innerWidth < 1264) {
        this.screenSize = 'md'
      } else if (window.innerWidth > 600 && window.innerWidth < 960) {
        this.screenSize = 'sm'
      } else {
        this.screenSize = 'xs'
      }
    },
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
