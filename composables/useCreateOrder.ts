export const useCreateOrder = () => {
    const config = useRuntimeConfig()
    const fetchCreateOrder = async (token: string, body) => {
        try {
            const response = await $fetch(`${config.public.siteUrlApi}/api/shop/cart/order?token=${token}&domain=${config.public.siteUrlDomain}`, {
                method: 'POST',
                body: body
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
            return [];
        }
    };

    return {fetchCreateOrder};
};