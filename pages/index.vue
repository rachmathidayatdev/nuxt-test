<template>
  <div v-resize="onResize">
    <carousel />
    <v-container class="light relative">
      <!-- search section -->
      <v-card class="mx-auto card-information" max-width="100%" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <h2 class="title">Welcome</h2>
            <p>Find your affordable room, promotions and so much more…</p>
            <v-row class="mt-4">
              <v-col class="no-padding-t-b" cols="12" md="10" sm="12">
                <v-row>
                  <v-col class="no-padding-t-b" cols="12" md="12">
                    <v-text-field
                      v-model="location"
                      outlined
                      dense
                      class="mt-2"
                      label="Search Location"
                      placeholder="Cari Lokasi Kost"
                      :error-messages="locationErrors"
                      required
                      prepend-inner-icon="mdi-magnify"
                      @input="$v.location.$touch()"
                      @blur="$v.location.$touch()"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col class="no-padding-t-b" cols="12" md="2" sm="12">
                <v-row>
                  <v-col class="no-padding-t-b" cols="12">
                    <v-btn
                      class="mt-2 btn-social--media"
                      outlined
                      color="deep-orange accent-3"
                      style="width: 100%;"
                      @click="searchLocation"
                      ><span class="btn-item">Search</span></v-btn
                    >
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <!-- sampai sini -->

      <!-- categroy section -->
      <h2 class="title mtm-20">Why RoomMe?</h2>
      <p class="mb-6">
        Make the most of your stay with our affordable price
      </p>
      <swiper />
      <!-- sampai sin -->

      <!-- location section -->
      <h2 class="title mt-8">Lokasi yang banyak dicari</h2>
      <p style="margin-bottom: -20px !important;">
        Check out some of our featured units around your area
      </p>
      <swiper-location />
      <!-- sampai sini -->

      <!-- recomendation section -->
      <h2 class="title">Listings You Might Like..</h2>
      <p style="margin-bottom: -20px !important;">
        Check out some of our featured units around your area
      </p>
      <swiper-recommendation />
      <!-- sampai sini -->

      <!-- steper -->
      <div v-if="screenSize !== 'xs' && screenSize !== 'sm'">
        <h2 class="title">Are You a Landlord? {{ screenSize }}</h2>
        <p>We invite you to join our Rumah Kost Network {{ screenSize }}</p>
        <v-stepper alt-labels class="custom">
          <v-stepper-header>
            <v-stepper-step step="1">
              <div class="stepper-item">
                <v-avatar min-width="100" height="100" width="100">
                  <img
                    src="https://roomme.id/public/img/4d4ac91.svg"
                    alt="John"
                    height="100"
                    width="100"
                  />
                </v-avatar>
                <h3 class="my-3">Register Your Unit</h3>
                <p>Fill out our form</p>
              </div>
            </v-stepper-step>

            <v-divider class="custom"></v-divider>

            <v-stepper-step step="2">
              <div class="stepper-item">
                <v-avatar min-width="100" height="100" width="100">
                  <img
                    src="https://roomme.id/public/img/c087d0c.svg"
                    alt="John"
                    height="100"
                    width="100"
                  />
                </v-avatar>
                <h3 class="my-3">Wait For Visit</h3>
                <p>
                  Our staff will be in touch with you and schedule a site visit
                </p>
              </div>
            </v-stepper-step>

            <v-divider class="custom"></v-divider>

            <v-stepper-step step="3">
              <div class="stepper-item">
                <v-avatar min-width="100" height="100" width="100">
                  <img
                    src="https://roomme.id/public/img/daeb661.svg"
                    alt="John"
                    height="100"
                    width="100"
                  />
                </v-avatar>
                <h3 class="my-3">Contract Agreement</h3>
                <p>Complete all the necessary document</p>
              </div>
            </v-stepper-step>

            <v-divider class="custom"></v-divider>

            <v-stepper-step step="4">
              <div class="stepper-item">
                <v-avatar min-width="100" height="100" width="100">
                  <img
                    src="https://roomme.id/public/img/4764166.svg"
                    alt="John"
                    height="100"
                    width="100"
                  />
                </v-avatar>
                <h3 class="my-3">Get Promoted</h3>
                <p>Sit back, Relax and Get Popular!</p>
              </div>
            </v-stepper-step>
          </v-stepper-header>
        </v-stepper>
      </div>
      <!-- sampai sini -->
    </v-container>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import carousel from '@/components/carousel/carousel'
import swiper from '@/components/swiper/swiper'
import swiperLocation from '@/components/swiper/swiper_location'
import swiperRecommendation from '@/components/swiper/swiper_recommendation'
export default {
  components: {
    carousel,
    swiper,
    swiperLocation,
    swiperRecommendation,
  },
  mixins: [validationMixin],
  data() {
    return {
      location: '',
      screenSize: 'sm',
    }
  },
  computed: {
    locationErrors() {
      const errors = []
      if (!this.$v.location.$dirty) return errors
      !this.$v.location.required && errors.push('Location is required.')
      return errors
    },
    tester() {
      return this.screenSize
    },
  },
  async created() {
    await this.$store.dispatch('home/fetchHomeData')
  },
  methods: {
    searchLocation() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error')
      } else {
        this.$router.push({ name: 'unit', query: { location: this.location } })
      }
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
  },
  head: {
    title: 'Home page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Home page description',
      },
    ],
    noscript: [{ innerHTML: 'Body No Scripts', body: true }],
    script: [],
  },
  validations: {
    location: { required },
  },
}
</script>
