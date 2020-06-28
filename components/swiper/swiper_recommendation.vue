<template>
  <swiper class="swiper custom" :options="swiperOption">
    <swiper-slide v-for="(item, index) in recommendedList" :key="index">
      <v-card
        class="mx-auto my-12 recommendation"
        max-width="374"
        @click="$router.push({ name: 'unit' })"
      >
        <v-img height="250" :src="item.image.url"></v-img>
        <div v-if="item.discount > 0" class="discount">
          {{ item.discount }}% off Today
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
            <span>Rp {{ numberFormat(item.sellingPrice) }}</span>
          </div>
        </v-card-text>
      </v-card>
    </swiper-slide>
    <div slot="button-prev" class="swiper-button-prev"></div>
    <div slot="button-next" class="swiper-button-next"></div>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 30,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          830: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        },
      },
    }
  },
  computed: {
    recommendedList() {
      return this.$store.getters['home/getRecommendedList']
    },
  },
  methods: {
    numberFormat(val) {
      const numeral = require('numeral')
      return numeral(val).format('0,0')
    },
  },
}
</script>
