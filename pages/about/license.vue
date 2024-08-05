<script setup lang="ts">

</script>

<template>
  <div class="about-license">
    <div class="license">
      <img src="/images/license.webp" alt="Лицензия №33130/2003" class="company-license">
    </div>
    <div class="testimony">
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
