<template>
  <div>
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
  validations: {
    location: { required },
  },
  data() {
    return {
      location: '',
    }
  },
  computed: {
    locationErrors() {
      const errors = []
      if (!this.$v.location.$dirty) return errors
      !this.$v.location.required && errors.push('Location is required.')
      return errors
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
  },
}
</script>
