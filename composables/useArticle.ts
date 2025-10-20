export const useArticle = () => {
    const config = useRuntimeConfig()
    const fetchArticle = async (slug: string) => await $fetch(`${config.public.siteUrlApi}/api/site/pages/slug`, {
        params: {
            domain: config.public.siteUrlDomain,
            slug: slug
        }
    }).then(data => data?.data.page)
    return {fetchArticle}
}