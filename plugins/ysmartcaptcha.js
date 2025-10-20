import YSmartCaptcha from "vue3-yandex-smartcaptcha";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(YSmartCaptcha, {
        siteKey: "ysc1_8nVjO4BViuMNsC4CrckSVrIh0ioShW31BMupHjBn57bbcda5",
        lang: "Язык ('ru' | 'en' | 'be' | 'kk' | 'tt' | 'uk' | 'uz' | 'tr')"
    })
})