<template>
  <div>
    <NavBar/>
    <Nuxt/>
    <Footer/>
  </div>
</template>

<style scoped>
header {
  background: #39495e;
  padding: 10px 0;
}

nav {
  display: flex;
  justify-content: center;
}

nav a {
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
}

nav a:hover {
  text-decoration: underline;
}

main {
  padding: 20px;
}

</style>
<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
import Footer from "~/components/Footer.vue";
</script>
