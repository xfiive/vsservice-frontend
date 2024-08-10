<template>
  <div class="about-container">
    <div class="about-content">
      <h1>О компании</h1>
      <p>
        Частное предприятие <strong>
        <nuxt-link to="/">"ВитСбытСервис"</nuxt-link>
      </strong> на протяжении долгих лет успешно работает в сфере
        обеспечения
        противопожарной безопасности.
      </p>
      <p>
        Основным направлением деятельности является перезарядка огнетушителей и продажа противопожарного оборудования
        для обеспечения Вашей безопасности.
      </p>
      <p>
        На весь поставляемый товар у нас есть сертификаты. Также имеется <a href="/about/license" class="license-link">лицензия
        МЧС на право осуществления деятельности</a> по обеспечению пожарной безопасности. Все работы по перезарядке
        проводятся на современном оборудовании с соблюдением всех действующих стандартов.
      </p>
      <p>
        Преимущества работы с нами:<br>
        Индивидуальный подход к каждому клиенту и гибкая система скидок - это именно те вещи, за которые нас ценят и
        любят
        наши клиенты.<br>
        Каждый сотрудник имеет большой опыт работы и является настоящим профессионалом своего дела.<br>
        Наша компания гарантирует высокий уровень сервиса и мы будем рады видеть Вас в качестве наших постоянных
        клинтов.
      </p>
    </div>
    <div class="about-stats">
      <div class="stat">
        <p class="stats-number">12</p>
        <p class="stats-text">лет безупречной работы в области пожарной безопасности</p>
      </div>
      <div class="stat">
        <p class="stats-number">2000</p>
        <p class="stats-text">огнетушителей перезаряжаются нами ежемесячно</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.about-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2% 5%;
  gap: 2%;
  background: #a9a9a9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 20px auto;
  max-width: 100%;
  max-height: 30%;
}

.about-content {
  flex: 3;
  max-width: 60%;
}

.about-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 0.1%;
  border-radius: 5%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2c3e50;
  font-size: 2.5em;
  margin-bottom: 20px;
  text-align: center;
}

p {
  font-size: 18px;
  line-height: 1.6;
  margin: 10px 0;
}

.stats-number {
  font-size: 48px;
  color: red;
  margin: 0;
}

.stats-text {
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
}

.stat {
  margin-bottom: 20px;
}

.license-link {
  color: #3498db;
  text-decoration: none;
}

.license-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
    padding: 5%;
  }

  .about-content, .about-stats {
    max-width: 100%;
    margin: 10px 0;
  }

  h1 {
    font-size: 2em;
  }

  .stats-number {
    font-size: 36px;
  }

  .stats-text {
    font-size: 16px;
  }
}
</style>
