export const useEmptyCart =  () => {
    const cart = ref(null);
    const config = useRuntimeConfig()
    const fetchEmptyCart = async (token) => await $fetch(`${config.public.siteUrlApi}/api/shop/cart/empty?token=${token}&domain=${config.public.siteUrlDomain}`, {
        method: 'POST'
    })
        .then(res =>   {
        return cart.value = res.data.cart
    })
    return {
        fetchEmptyCart, cart
    }
}