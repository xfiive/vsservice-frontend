<template>
  <div>
    <header>
      <NavBar/>
    </header>
    <main>
      <nuxt/>
    </main>
    <footer>
      <p>© 2024 ЧТУП "ВитСбытСервис". Все права защищены.</p>
    </footer>
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

footer {
  background: #35495e;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
<script setup lang="ts">
import NavBar from "~/components/NavBar.vue";
</script>
