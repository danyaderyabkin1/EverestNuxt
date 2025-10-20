export const useUpdateQuantity = () => {
    // Используем useState вместо ref для shared состояния
    const config = useRuntimeConfig()
    const fetchUpdateQuantity = async (token: string, body) => {
        try {
            const response = await $fetch(`${config.public.siteUrlApi}/api/shop/cart/update?token=${token}&domain=${config.public.siteUrlDomain}`,{
                method: 'POST',
                body: body
            });
            return response.json();
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    };

    return {fetchUpdateQuantity};
};