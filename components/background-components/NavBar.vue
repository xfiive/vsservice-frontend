<script setup lang="ts">

</script>

<template>
  <nav class="navbar">
    <nuxt-link to="/" class="nav-link" exact>Главная</nuxt-link>
    <nuxt-link to="/services" class="nav-link" exact>Услуги</nuxt-link>
    <nuxt-link to="/catalog" class="nav-link" exact>Каталог товаров</nuxt-link>
    <nuxt-link to="/about" class="nav-link" exact>О нас</nuxt-link>
    <nuxt-link to="/contacts" class="nav-link" exact>Контакты</nuxt-link>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  background-color: #39495e;
  padding: 10px 0;
}

.nav-link {
  color: #fff;
  margin: 0 15px;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983;
}

.nav-link-active {
  border-bottom: 2px solid #42b983;
}
</style>
