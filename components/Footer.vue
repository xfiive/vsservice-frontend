<script setup lang="ts">

</script>

<template>
  <footer>
    <p>
      <span class="company">
        <nuxt-link to="/">© 2024 ЧТУП "ВитСбытСервис".</nuxt-link>
      </span>
      <span class="license">
        <nuxt-link to="/license"> Все права защищены.</nuxt-link>
      </span>
    </p>
  </footer>
</template>

<style scoped>

footer {
  background: #35495e;
  color: #fff;
  text-align: center;
  padding: 10px 0;
  position: fixed;
  width: 100%;
  bottom: 0;
}

p {
  margin: 10px;
}

nuxt-link {
  color: inherit;
  text-decoration: darkgray;
}

nuxt-link:hover {
  text-decoration: underline;
}

</style>
