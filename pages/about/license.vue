<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

</script>

<template>
  <div class="about-license">
    <div class="license">
      <h2><strong><span>Лицензия №33130/2003</span></strong></h2>
      <img src="/images/license.webp" alt="Лицензия №33130/2003" class="company-license">
    </div>
    <div class="testimony">
      <h2><strong><span>Свидетельство о регистрации компании</span></strong></h2>
      <img src="/images/testimony.webp" alt="Свидетельство о регистрации компании" class="company-testimony">
    </div>
  </div>
</template>

<style scoped>
.about-license {
  display: flex;
  justify-content: space-between;
  padding: 2%;
  gap: 2%;
}

.license, .testimony {
  flex: 1;
}

.company-license, .company-testimony {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 20px auto;
}
</style>
