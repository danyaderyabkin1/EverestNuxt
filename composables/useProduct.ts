export const useProduct = () => {
    const config = useRuntimeConfig()
    const fetchProduct = async (slug: string) => await $fetch(`${config.public.siteUrlApi}/api/shop/products/slug?domain=${config.public.siteUrlDomain}&slug=${slug}`, {
    }).then(data => data?.data.product);
    return {
        fetchProduct
    }
}