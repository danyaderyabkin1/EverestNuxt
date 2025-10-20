<script setup lang="ts">
const cookie = useCookie('noty')
const cookieMain = useCookie('cook')
const acceptCookie = () => cookie.value = '1'
const acceptCookieMain = () => cookieMain.value = '1'
</script>


<template>
  <footer class="footer">
    <div class="container footer__container">
      <div class="footer__wrap">
        <NuxtLink to="/">
          <img src="/assets/images/logo-1.webp" alt="logo">
<!--          <span class="font-semibold">С Вами в любой точке страны</span>-->
        </NuxtLink>
        <div>
          <div class="footer__info">
            <p class="font-semibold mb-2">
              153012, г Иваново, ул Сакко, д 39, оф 1006
            </p>
            <p class="footer__phone">
              <a href="tel:+74932267730">8 (4932) 26-77-30</a>
            </p>
<!--            <p class="footer__phone-medium">-->
<!--              <a href="tel:+79115119990">+7 911 511-99-90</a>-->
<!--            </p>-->
            <p class="footer__mail">
              <a href="mailto:pkf-everest@yandex.ru">pkf-everest@yandex.ru</a>
            </p>
            <p class="font-semibold text-lg">
              написать нам
            </p>
          </div>
          <div class="footer__contacts">
            <a
                href="https://api.whatsapp.com/send/?phone=%2B79621690551&text&type=phone_number&app_absent=0"
                target="_blank">
              <UIcon name="i-mingcute-whatsapp-fill" class="size-10 text-[#25d366]"/>
            </a>
            <a href="https://t.me/+79621690551" target="_blank">
              <UIcon name="uil:telegram" class="size-10 text-[#2ca5e0]"/>
            </a>
          </div>

        </div>
      </div>
      <nav class="nav">
        <div class="nav__wrap">
          <h3>Каталог</h3>
          <div class="nav__double">
<!--              <TheFooterSubMenu/>-->
          </div>
        </div>
        <div class="nav__wrap">
          <h3>О компании</h3>
          <ul class="nav__list">
            <li class="nav__item">
              <NuxtLink class="nav__link" to="/aboutus#about">Вступление</NuxtLink>
            </li>
            <li class="nav__item">
              <NuxtLink class="nav__link" to="/news">Публикации</NuxtLink>
            </li>
<!--            <li class="nav__item">-->
<!--              <NuxtLink class="nav__link" to="/aboutus#sert">Сертификаты</NuxtLink>-->
<!--            </li>-->
<!--            <li class="nav__item">-->
<!--              <NuxtLink class="nav__link" to="/aboutus#thank">Благодарности</NuxtLink>-->
<!--            </li>-->
            <li class="nav__item">
              <NuxtLink class="nav__link" to="/aboutus#pay">Оплата и доствка</NuxtLink>
            </li>
            <li class="nav__item">
              <NuxtLink class="nav__link" to="/contacts">Контактная информация</NuxtLink>
            </li>
<!--            <li class="nav__item">-->
<!--              <NuxtLink class="nav__link" to="/aboutus#contacts">Обратная связь</NuxtLink>-->
<!--            </li>-->
            <li class="nav__item">
              <NuxtLink class="nav__link" to="/politika">Персональные данные</NuxtLink>
            </li>
            <li class="hidden xl:flex justify-end mt-auto w-full">
              <a href="https://moovix.ru/" target="_blank" rel="noopener noreferrer">
                <img src="/assets/images/moovix.png" alt="moovix">
              </a>
            </li>
          </ul>
        </div>
        <!--        <div class="nav__wrap">-->
        <!--          <h3>Информация</h3>-->
        <!--          <ul class="nav__list">-->
        <!--            <li class="nav__item">-->
        <!--              <NuxtLink class="nav__link" to="/politika">Политика конфиденциальности</NuxtLink>-->
        <!--            </li>-->
        <!--            <li class="nav__item">-->
        <!--              <NuxtLink class="nav__link" to="/politika">Обработка персональных данных</NuxtLink>-->
        <!--            </li>-->
        <!--          </ul>-->
        <!--        </div>-->
      </nav>
      <div class="text-center block xl:hidden mt-10">
        <p>© 2008-{{ new Date().getFullYear() }} Эверест | Все права защищены</p>
        <a class="flex justify-center mt-2" href="https://moovix.ru/" target="_blank" rel="noopener noreferrer">
          <img class="w-14 lg:w-fit" src="/assets/images/moovix.png" alt="moovix">
        </a>
      </div>

    </div>
    <div v-if="!cookie" id="cookie_note" class="show"><p>Наши цены напрямую зависят от курса доллара. В связи с этим,
      актуальные цены
      следует уточнять у наших менеджеров. Мы всегда готовы предоставить вам наиболее актуальную информацию о стоимости
      наших товаров и услуг. Спасибо за понимание и сотрудничество!.</p>
      <p>
        <button class="cookie_accept btn btn-primary" @click.prevent="acceptCookie">Принять</button>
      </p>
    </div>
    <div v-if="!cookieMain" id="cookie_note"  class="show btm">
      <p>
        Мы используем файлы <router-link class="underline" to="/politika">cookie.</router-link> Продолжая работу Вы принимаете условия пользования
      </p>
      <p>
        <button class="cookie_accept btn btn-primary" @click.prevent="acceptCookieMain">Согласен</button>
      </p>
    </div>
  </footer>
  <Teleport to="body">
<!--    <TheFooterCart/>-->
  </Teleport>
</template>

<style scoped>
.socials-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: fixed;
  right: 0;
  top: 30%;
  background-color: #fff;
  padding: 15px 5px 15px 15px;
  z-index: 99;
  border-radius: 30px 0 0 30px;
}

#cookie_note {
  display: flex;
  z-index: 99;
  position: fixed;
  bottom: 15px;
  left: 2%;
  max-width: 475px;
  padding: 20px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
  font-size: 12px;
}

#cookie_note.btm {
  bottom: 170px;
}

.cookie_accept {
  width: auto;
  cursor: pointer;
  white-space: nowrap;
  padding: 10px 20px;
  border: navajowhite;
  background-color: #2b70fa;
  color: #fff;
  margin-left: 20px;
  border-radius: 5px;
  font-size: 10px;
}

@media (max-width: 767.98px) {
  #cookie_note {
    flex-direction: column;
    max-width: 96%;
  }
  #cookie_note.btm {
    bottom: 200px;
  }

  .cookie_accept {
    margin-left: 0;
    margin-top: 10px;
    width: 100%;
  }
}
</style>