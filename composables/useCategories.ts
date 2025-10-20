export const useCategories = () => {
    const config = useRuntimeConfig()
    const fetchCategories = async (parentId?:number) => await $fetch(`${config.public.siteUrlApi}/api/shop/categories?domain=${config.public.siteUrlDomain}`, {
        params: {
            parentId,
        },
    }).then(data => data?.data.categories);
    return {
        fetchCategories
    }
}