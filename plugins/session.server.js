export default defineNuxtPlugin(async (nuxtApp) => {
    const token = useCookie('_token');
    if (!token.value) {
        const response = await $fetch.raw(`https://b.otellica.ru/api/user/startSession`);
        token.value = await response._data.data.token;
    }
})