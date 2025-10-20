export const useProducts = () => {
    const config = useRuntimeConfig()
    const fetchProducts = async (categoryId: number, sortBy,  sortDirection) => await $fetch(`${config.public.siteUrlApi}/api/shop/products?domain=${config.public.siteUrlDomain}`, {
        params: {
            categoryId,
            sortBy: sortBy || '',
            sortDirection: sortDirection || '',
        },
    }).then(data => data?.data.products);
    return {
        fetchProducts
    }
}