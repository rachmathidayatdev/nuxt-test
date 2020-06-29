<template>
  <v-container>
    <div style="height: 70px;"></div>
    <h2 class="text-centered">Unit Listing</h2>
    <p v-if="location !== ''" class="sub-title text-centered">
      Search keywoard: "{{ location }}"
    </p>

    <!-- unit section -->
    <v-row>
      <v-col
        v-for="(item, index) in unitListing"
        :key="index"
        lg="3"
        md="3"
        sm="6"
        xs="6"
      >
        <v-card class="mx-auto recommendation" max-width="374" min-height="420">
          <v-img height="250" :src="item.image.url"></v-img>
          <div class="rating">
            <v-icon size="12">mdi-star</v-icon> {{ item.rating }}
          </div>
          <v-card-title>
            <h3 class="title">{{ item.name }}</h3>
          </v-card-title>
          <v-card-text>
            <div class="desc">
              {{ item.address }}
            </div>
            <div class="price">
              <span
                v-if="item.originalPrice !== item.sellingPrice"
                class="strike-through"
                >Rp {{ numberFormat(item.originalPrice) }}</span
              >
              <span>Rp {{ numberFormat(item.sellingPrice) }} / month</span>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!-- sampai sini -->
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      location: '',
    }
  },
  computed: {
    unitListing() {
      return this.$store.getters['home/getUnitListingList']
    },
  },
  async created() {
    await this.$store.dispatch('home/fetchUnitListing')
    this.location = this.$route.query.location || ''
  },
  methods: {
    numberFormat(val) {
      const numeral = require('numeral')
      return numeral(val).format('0,0')
    },
  },
  head: {
    title: 'Unit Listing page',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Unit Listing page description',
      },
    ],
    noscript: [{ innerHTML: 'Body No Scripts', body: true }],
    script: [],
  },
}
</script>
