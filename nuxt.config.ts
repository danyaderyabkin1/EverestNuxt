export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: false},

    app: {
        pageTransition: {name: 'page', mode: 'default'},
        head: {
            // script: [
            //     {
            //         src: `//code.jivo.ru/widget/uwVb91Vt5A`,
            //         async: true,
            //         defer: true
            //     },
            // ],
            htmlAttrs: {
                lang: 'ru'
            },
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0',
            title: 'Комплексное оснащение отелей и гостиниц: от мебели до текстиля',
            link: [{rel: 'shortcut icon', type: 'image/x-icon', href: '/assets/images/favicons/favicon.ico'},
                {rel: 'icon', type: 'image/x-icon', href: '/assets/images/favicons/favicon.ico'},
                {
                    rel: 'apple-touch-icon',
                    sizes: '76x76',
                    type: 'image/x-icon',
                    href: '/assets/images/favicons/favicon76.png'
                },
                {rel: 'apple-touch-icon', type: 'image/x-icon', href: '/assets/images/favicons/favicon.png'},
                {rel: 'icon', type: 'image/x-icon', href: '/assets/images/favicons/favicon.png'},
            ]
        }
    },
    modules: ['@nuxtjs/sitemap', '@nuxt/ui', '@nuxt/eslint', 'nuxt-swiper', 'nuxt-yandex-metrika'],
    yandexMetrika: {
        id: '95052173',
        options: {
            webvisor: true
        },
    },
    plugins: [
        {src: '~/plugins/ysmartcaptcha.js', mode: 'client'},
    ],

    css: ['assets/scss/style.scss'],

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    silenceDeprecations: ["import"]
                }
            }
        }
    },
    colorMode: {
        preference: 'light'
    },
    nitro: {
        prerender: {
            ignore: [
                '/api/products.xml', // Ваш фид товаров
                '/sitemap.xml',      // Теперь обрабатывается отдельно
                '/robots.txt'        // Теперь обрабатывается отдельно
            ]
        }
    },
    runtimeConfig: {
        public: {
            AUTH: 'Y2tfMTczZjQ1ZDYzMjU5NTFhYWRhMTNlZjhkN2E3ZTBmYzgwMjNiMjJlYTpjc19lZDNmMzY0ZDQ2OGUxNDc0YzJmN2Y3ZDI2NDNjNTI3NDMwM2NiNWY1',
            // AUTH: 'Y2tfYWFiYjRkM2VkYjM3YTM3ZTI1YjI2MjJiYTRlODY1NDExMDZkNDRiNTpjc19kMzlkOGM5NmE5MjcyMDhlOGY0M2Y4MDg0MmNlZTRjMmFjM2RjNTEx',
            recaptchaSiteKey: '6LeVzP4nAAAAAElEVVrg5GpudNZrN_Q6bnua_M9l',
            siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://mstage.ru',
            siteUrlDomain: process.env.NUXT_PUBLIC_SITE_URL || 'backeverest.mstage.ru',
            siteUrlApi: process.env.NUXT_PUBLIC_SITE_URL || 'https://backeverest.mstage.ru',
            siteName: 'Эверест'
        }
    },

})