<script setup lang="ts">

const route = useRoute()
const visibleMenu = ref(true)
const scrollY = ref(0);


const {fetchCategories} = useCategories()
const {fetchProducts} = useProducts()
const { data: mainCategories } = await useLazyAsyncData('categories', async () => {
  const categories = await fetchCategories();
  const withSubs = await Promise.all(
      categories.map(async cat => ({
        ...cat,
        subCategories: await fetchProducts(cat.id, '', '')
      }))
  );
  return { categories: withSubs };
});


const handleScroll = () => {
  scrollY.value = window.scrollY;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
watch(() => route.path, () => {
  visibleMenu.value = true;
})

</script>

<template>
  <header class="header" :class="{circle: scrollY > 25}">
    <div class="container header__container">
      <NuxtLink class="header__link" to="/">
        <img v-show="scrollY > 25" class="header__logo" src="/assets/images/logo.webp" alt="logo">
        <img v-show="scrollY < 25" class="header__logo" src="/assets/images/logo-1.webp" alt="logo">
      </NuxtLink>
      <nav class="nav">
        <ul class="nav__list">
          <li class="nav__item" v-for="category in mainCategories?.categories" :key="category.id">
            <NuxtLink v-if="category.id !== 14" class="nav__link" :to="category.url">{{category.title}}
              <UIcon v-if="category.id !== 13" name="lucide:chevron-down" class="size-5"/>
            </NuxtLink>
            <NuxtLink class="nav__link cursor-default" v-if="category.id === 14">{{category.title}}
              <UIcon  name="lucide:chevron-down" class="size-5"/>
            </NuxtLink>
            <ClientOnly>
              <TheHeaderSubMenu :sub-category="category?.subCategories"/>
            </ClientOnly>
          </li>
          <li class="nav__item">
            <NuxtLink class="nav__link" to="/aboutus">О компании
              <UIcon name="lucide:chevron-down" class="size-5"/>
            </NuxtLink>
            <ul class="nav__list-dropdown">
              <li>
                <NuxtLink to="/contacts">Контактная информация</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/aboutus">История</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/pay">Партнеры</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/pay">Новости компании</NuxtLink>
              </li>
              <li>
                <NuxtLink to="/reviews">Реквизиты и лицензии</NuxtLink>
              </li>
              </ul>
          </li>
        </ul>
      </nav>
      <div class="header__info">
        <svg class="hidden sm:block" width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_1_27)">
            <path d="M41.3753 30.8173C41.3804 31.502 40.975 32.1186 40.3538 32.4066C36.4454 34.2195 31.012 35.3449 24.9999 35.3449C18.9878 35.3449 13.5544 34.2196 9.64592 32.4066C9.02483 32.1185 8.61945 31.5019 8.62444 30.8173C8.74709 14.3615 11.7573 0 25 0C38.2427 0 41.253 14.3615 41.3753 30.8173Z" fill="#5A4146"/>
            <path d="M31.0345 33.4809V29.3104H18.9655V33.4809C18.9655 34.5941 18.2532 35.5823 17.1971 35.9343L8.98165 38.6728C7.22159 39.2595 6.03448 40.9067 6.03448 42.7619V48.2759C6.03448 49.2281 6.80636 50 7.75861 50H42.2413C43.1936 50 43.9654 49.2281 43.9654 48.2759V42.7619C43.9654 40.9067 42.7782 39.2595 41.0182 38.6728L32.8027 35.9343C31.7468 35.5822 31.0345 34.594 31.0345 33.4809Z" fill="#E6AF78"/>
            <path d="M18.9656 33.4809C18.9656 34.5243 18.3354 35.4509 17.3873 35.8537C27.0475 37.5 31.0319 30.6035 31.0319 30.6035L31.0346 30.6017V29.3104H18.9656V33.4809Z" fill="#D29B6E"/>
            <path d="M41.0181 38.6728L34.3053 36.4352C31.1102 40.7697 27.381 43.1917 25 43.9656C22.6189 43.1917 18.8897 40.7697 15.6947 36.4352L8.98181 38.6728C7.22166 39.2595 6.03455 40.9067 6.03455 42.7619V48.2759C6.03455 49.2281 6.80652 50 7.75867 50H42.2414C43.1935 50 43.9655 49.2281 43.9655 48.2759V42.7619C43.9655 40.9066 42.7783 39.2595 41.0181 38.6728Z" fill="#E4EAF6"/>
            <path d="M11.921 44.6796L7.13878 39.8973C6.44933 40.6696 6.03448 41.6765 6.03448 42.7618V48.2758C6.03448 49.228 6.80636 49.9999 7.75861 49.9999H12.9311V47.1178C12.9311 46.2034 12.5678 45.3263 11.921 44.6796Z" fill="#D7DEED"/>
            <path d="M38.079 44.6796L42.8613 39.8973C43.5507 40.6696 43.9656 41.6765 43.9656 42.7618V48.2758C43.9656 49.228 43.1937 49.9999 42.2414 49.9999H37.069V47.1178C37.069 46.2034 37.4322 45.3263 38.079 44.6796Z" fill="#D7DEED"/>
            <path d="M14.3072 37.4579C17.7698 42.1559 21.8258 44.7472 24.4672 45.6054L25 45.7783L25.5329 45.6053C28.1744 44.747 32.2304 42.1557 35.693 37.4578L36.0022 37.0006L34.3053 36.4349C31.1104 40.7695 27.3812 43.1916 25.0001 43.9654C22.6191 43.1916 18.8899 40.7695 15.6949 36.435L13.998 37.0007L14.3072 37.4579Z" fill="#D7DEED"/>
            <path d="M13.9375 18.1122L12.9364 18.109C11.9821 18.1059 11.2068 18.8788 11.2068 19.8331V23.2412C11.2068 24.2068 11.9998 24.9842 12.9653 24.965L14.4512 24.9354L13.9375 18.1122Z" fill="#707487"/>
            <path d="M12.9365 18.109C12.9345 18.109 12.933 18.1096 12.931 18.1096V24.9623C12.9427 24.9623 12.9537 24.9654 12.9654 24.9652L14.4512 24.9356L13.9376 18.1124L12.9365 18.109Z" fill="#65687A"/>
            <path d="M36.0625 18.1122L37.0636 18.109C38.0179 18.1059 38.7932 18.8788 38.7932 19.8331V23.2412C38.7932 24.2068 38.0002 24.9842 37.0347 24.965L35.5488 24.9354L36.0625 18.1122Z" fill="#707487"/>
            <path d="M37.0635 18.109C37.0654 18.109 37.067 18.1096 37.0689 18.1096V24.9623C37.0573 24.9623 37.0463 24.9654 37.0345 24.9652L35.5487 24.9356L36.0624 18.1124L37.0635 18.109Z" fill="#65687A"/>
            <path d="M13.7931 10.3448V14.0617C13.7931 15.6063 13.8524 17.1501 13.9708 18.69L14.4676 25.1479C14.5864 26.6915 15.3903 28.1008 16.6585 28.9886L21.8644 32.6326C22.783 33.2757 23.8773 33.6207 24.9987 33.6207H25.0012C26.1225 33.6207 27.2168 33.2758 28.1355 32.6326L33.3413 28.9886C34.6097 28.1008 35.4136 26.6915 35.5323 25.1479L36.029 18.69C36.1475 17.1501 36.2068 15.6062 36.2068 14.0617V10.3448H13.7931Z" fill="#F0C087"/>
            <path d="M36.1423 10.3448H13.7931V14.0619C13.7931 14.5409 13.8093 15.0196 13.8206 15.4984V15.4987C13.8343 16.0743 13.8562 16.6495 13.8864 17.2245C13.8864 17.2246 13.8864 17.2248 13.8864 17.2248C13.912 17.7133 13.9333 18.2021 13.9708 18.6899L14.4676 25.1478C14.5864 26.6914 15.3903 28.1007 16.6586 28.9885L21.8645 32.6325C22.7831 33.2755 23.8774 33.6204 24.9988 33.6204C23.6154 33.6204 22.0949 31.2392 21.141 29.4333C20.5126 28.2438 20.1773 26.9251 20.1522 25.58L20.0066 17.7745C19.995 17.1538 20.4448 16.6258 21.0564 16.5197C25.6794 15.7173 29.3492 14.4063 31.4471 13.48C33.1102 16.229 35.3006 17.0513 35.5846 17.1484L35.8558 17.241H36.1127C36.143 16.6666 36.1651 16.092 36.179 15.5169L36.1423 10.3448Z" fill="#E6AF78"/>
            <path d="M12.931 9.48273V15.5172C23.1444 15.5172 30.9191 11.9615 32.2213 11.1759C33.6207 14.6551 36.1423 15.5172 36.1423 15.5172H37.069V9.48273H12.931Z" fill="#5A4146"/>
            <path d="M37.0345 24.9649L35.5553 24.9355C34.8971 26.1313 32.9256 28.0893 27.0472 28.0893V29.8135C34.9026 29.8135 36.9183 26.466 37.4304 24.9235C37.3027 24.9508 37.1711 24.9677 37.0345 24.9649Z" fill="#464655"/>
            <path d="M26.2931 30.1724H25.4309C24.7168 30.1724 24.1379 29.5934 24.1379 28.8794C24.1379 28.1652 24.7169 27.5863 25.4309 27.5863H26.2931C27.0072 27.5863 27.5861 28.1653 27.5861 28.8794C27.5862 29.5934 27.0072 30.1724 26.2931 30.1724Z" fill="#5B5D6E"/>
          </g>
          <defs>
            <clipPath id="clip0_1_27">
              <rect width="50" height="50" fill="white"/>
            </clipPath>
          </defs>
        </svg>
        <div>
          <p class="header__phone">
            <a href="tel:+74932267730">8 (4932) 26-77-30</a>
          </p>
          <p class="header__mail">
            <a href="mailto:pkf-everest@yandex.ru">pkf-everest@yandex.ru</a>
          </p>
        </div>
      </div>
      <div class="mobile__wrap">
        <button v-if="visibleMenu" class="btn-mobile">
          <UIcon name="ic:outline-menu" class="size-7" @click.prevent="visibleMenu = !visibleMenu"/>
        </button>
        <button v-else class="btn-mobile" @click.prevent="visibleMenu = !visibleMenu">
          <UIcon name="ic:outline-close" class="size-7"/>
        </button>
      </div>
      <TheHeaderMobile :categories="mainCategories?.categories" :visible-menu="!visibleMenu" />
    </div>
  </header>
</template>

<style scoped>

</style>