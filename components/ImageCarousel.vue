<template>
  <div class="carousel">
    <div class="carousel-inner" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(image, index) in images" :key="index" class="carousel-item">
        <img :src="image" class="carousel-image" alt="img"/>
      </div>
    </div>
    <button class="carousel-control prev" @click="prevImage">‹</button>
    <button class="carousel-control next" @click="nextImage">›</button>
  </div>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, ref} from 'vue';

const images = [
  require('@/resources/scroll-0.jpg'),
  require('@/resources/scroll-1.jpg'),
  require('@/resources/scroll-2.jpg')
];

const currentIndex = ref(0);
let interval: any;

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

onMounted(() => {
  interval = setInterval(nextImage, 3000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  width: 800px;
  height: 400px;
  margin: 0 auto;
}

.carousel-inner {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-item {
  min-width: 100%;
  box-sizing: border-box;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 18px;
  z-index: 1;
}

.carousel-control.prev {
  left: 10px;
}

.carousel-control.next {
  right: 10px;
}
</style>
