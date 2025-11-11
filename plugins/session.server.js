export default defineNuxtPlugin(async (nuxtApp) => {
    const token = useCookie('_token');
    const config = useRuntimeConfig();
    if (!token.value) {
        try {
            const response = await $fetch.raw(`${config.public.siteUrlApi}/api/user/startSession`);
            token.value = response._data.data.token;
        } catch (error) {
            console.error('❌ Session error:', error);
        }
    }
});