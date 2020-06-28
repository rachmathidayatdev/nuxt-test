<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
    delimiter-icon="mdi-minus"
    style="margin-top: 50px;"
  >
    <v-carousel-item
      v-for="(item, index) in bannerList"
      :key="index"
      :src="item.image.url"
      @click="openNewTab(item.image.url)"
    >
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    bannerList() {
      return this.$store.getters['home/getBanner']
    },
  },
  methods: {
    openNewTab(url) {
      window.open(url, '_blank')
    },
  },
}
</script>
