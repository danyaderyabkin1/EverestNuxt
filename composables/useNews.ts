export const useNews = () => {
    const config = useRuntimeConfig()
    const fetchNews = async () => await $fetch(`${config.public.siteUrlApi}/api/site/pages`, {
        params: {
            domain: config.public.siteUrlDomain,
            news: 1
        }
    }).then((data) => data?.data.pages.reverse())
    return {fetchNews}
}