<template>
  <ImageCarousel/>
</template>

<script setup lang="ts">

import ImageCarousel from "~/components/ImageCarousel.vue";
</script>

<style scoped>
h1 {
  color: #2c3e50;
}

p {
  font-size: 18px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b983;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #35495e;
}

.dynamic-box {
  width: 100px;
  height: 100px;
  margin-top: 20px;
  transition: background-color 0.5s;
}
</style>
