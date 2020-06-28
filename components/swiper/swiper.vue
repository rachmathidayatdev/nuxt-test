<template>
  <swiper class="swiper custom" :options="swiperOption">
    <swiper-slide v-for="(item, index) in categoryList" :key="index">
      <div class="category-box">
        <img :src="item.imageUrl" height="60px" width="60px" />
        <div>{{ item.name }}</div>
      </div>
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
      categoryList: [
        {
          id: 1,
          name: 'Parkir Area',
          imageUrl: 'https://cdn.roomme.id/icons/RoomMe_Icon_Parking Area.svg',
        },
        {
          id: 2,
          name: 'Free Wifi',
          imageUrl: 'https://cdn.roomme.id/icons/RoomMe_Icon_Free Wi-Fi.svg',
        },
        {
          id: 3,
          name: 'Water Heater',
          imageUrl: 'https://cdn.roomme.id/icons/RoomMe_Icon_Water Heater.svg',
        },
        {
          id: 4,
          name: 'Kitchen',
          imageUrl: 'https://cdn.roomme.id/icons/RoomMe_Icon_Kitchen.svg',
        },
        {
          id: 5,
          name: 'CCTV',
          imageUrl: 'https://cdn.roomme.id/icons/RoomMe_Icon_Security.svg',
        },
        {
          id: 6,
          name: 'Air Conditioning',
          imageUrl:
            'https://cdn.roomme.id/icons/RoomMe_Icon_Air Conditioning.svg',
        },
        {
          id: 7,
          name: 'Full Equipment',
          imageUrl:
            'https://cdn.roomme.id/icons/RoomMe_Icon_Full Equipment.svg',
        },
        {
          id: 8,
          name: 'Strategic Location',
          imageUrl:
            'https://cdn.roomme.id/icons/RoomMe_Icon_Strategic Location.svg',
        },
      ],
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        breakpoints: {
          // when window width is >= 320px
          320: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 480px
          480: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          830: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        },
      },
    }
  },
}
</script>
