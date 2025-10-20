<script setup lang="ts">
const confettiContainer = ref(null)
const interval = ref(0)
onMounted(() => {

  const showConfetti = () => {
    const confetti = document.createElement("div");
    confetti.textContent = "🎉";
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * innerWidth + "px";
    confettiContainer.value.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 5000);
  };

  interval.value = setInterval(() => {
    showConfetti();
  }, 100);
})
onUnmounted(() => {
  clearInterval(interval.value)
})

</script>

<template>
  <main class="main flex">
    <section class="thanks relative flex-1 pt-8 flex-col flex items-center">
      <div class="container thanks__container mt-80 flex justify-center text-center">
        <div class="thanks__wrap">
          <h1>Спасибо!</h1>
          <p class="my-4">Специалист свяжется с Вами в ближайшее время!</p>
          <NuxtLink to="/" class="btn inline-block btn-primary text-white">На главную</NuxtLink>
        </div>
        <div id="confetti-container" ref="confettiContainer"/>
      </div>
      <MainNewsList class="z-10"/>
    </section>
  </main>
</template>

<style scoped>
#confetti-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  overflow: hidden;
}

.thanks__wrap {
  position: relative;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 3px 50px -1px #00000013;
  border-radius: 30px;
  padding: 10px 40px;
  margin-bottom: 2rem;
}

.btn-primary {
  color: #fff;
}


</style>