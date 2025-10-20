export const useCategoriesBySlug = () => {
    const config = useRuntimeConfig()
    const fetchCategories = async (cat: string) => await $fetch(`${config.public.siteUrlApi}/api/shop/categories/slug?domain=${config.public.siteUrlDomain}&slug=${cat}`,).then(data => data?.data.category);
    return {
        fetchCategories
    }
}