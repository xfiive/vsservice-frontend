<script setup lang="ts">
</script>

<template>
  <!--  <div class="wrapper">-->
  <footer>
    <div class="footer">
      <div class="footer-section contacts">
        <p class="header"><strong>Контактные данные Витебск:</strong></p>
        <p><a href="tel:+375212555500">(0212) 55-55-00</a></p>
        <p><a href="tel:+375296241352">(29) 624-13-52</a></p>
        <p><a href="tel:+375297122505">(29) 712-25-05</a></p>
        <p class="email"><a href="mailto:vitsbs@mail.ru">vitsbs@mail.ru</a></p>

        <p class="header"><strong>Контактные данные Минск:</strong></p>
        <p><a href="tel:+375173434384">(017) 343-43-84</a></p>
        <p><a href="tel:+375447530025">(44) 753-00-25</a></p>
        <p><a href="tel:+375297530025">(29) 753-00-25</a></p>
        <p class="email"><a href="mailto:minsk-sbs@mail.ru">minsk-sbs@mail.ru</a></p>

        <nuxt-link to="/"><p>© 2008-2024 ЧП "ВитСбытСервис"</p></nuxt-link>
      </div>
      <div class="footer-section catalog">
        <h3>Каталог товаров</h3>
        <ul>
          <li>
            <nuxt-link to="/goods">Огнетушители</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/goods">Пожарные щиты и инвентарь</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/goods">Посмотреть все оборудование</nuxt-link>
          </li>
        </ul>
        <h3>Услуги</h3>
        <ul>
          <li>
            <nuxt-link to="/services">Перезарядка огнетушителей</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="footer-section hours">
        <h3>ВРЕМЯ РАБОТЫ</h3>
        <p>С 8:00 до 16:00 в будние дни</p>
        <p>Выходные дни - Суббота и Воскресенье</p>
        <p class="header"><strong>Ваша безопасность - наша забота</strong></p>
      </div>
    </div>
  </footer>
  <!--  </div>-->
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}

footer {
  background: #39495e;
  color: #dcdcdc;
  width: 100%;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 2% 5%;
  text-align: left;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  margin: 0 1em;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.contacts .header, .catalog h3, .hours h3 {
  margin-top: 0;
}

.logo-img {
  width: 100%;
  height: auto;
  margin-bottom: 1em;
}

.footer-section h3 {
  color: #a9a9a9;
  font-size: 1.2em;
}

.footer-section ul {
  list-style-type: none;
  padding: 0;
}

.footer-section ul li {
  margin: 0.5em 0;
}

.contacts p {
  margin: 0.5em 0;
  text-align: center;
}

.contacts .email {
  display: flex;
  justify-content: center;
  align-items: center;
}

.contacts a {
  color: #dcdcdc;
  text-decoration: none;
}

.contacts a:hover {
  text-decoration: underline;
}

.contact-info {
  display: block;
  color: #dcdcdc;
}

nuxt-link {
  color: inherit;
  text-decoration: none;
}

nuxt-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .footer {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    margin: 1em 0;
    text-align: center;
  }
}
</style>
