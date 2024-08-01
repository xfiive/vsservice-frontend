<template>
  <!--  <div>-->
  <!--    <h1>ЧТУП "ВитСбытСервис"</h1>-->
  <!--    <p>{{ dynamicMessage }}</p>-->
  <!--    <button @click="changeMessage">Изменить сообщение</button>-->
  <!--    <div class="dynamic-box" :style="{ backgroundColor: boxColor }"></div>-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import {ref} from 'vue';

const dynamicMessage = ref('Начальное сообщение');
const boxColor = ref('#42b983');

const changeMessage = () => {
  dynamicMessage.value = 'Сообщение изменено!';
  boxColor.value = boxColor.value === '#42b983' ? '#35495e' : '#42b983';
};
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
