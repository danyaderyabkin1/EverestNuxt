// composables/useAddToCart.ts
export const useAddToCart = () => {
    const { fetchCart } = useCart();
    const config = useRuntimeConfig()
    const fetchAddToCart = async (token: string, body: any) => {
        try {
            const response = await $fetch(`${config.public.siteUrlApi}/api/shop/addToCart?token=${token}&domain=${config.public.siteUrlDomain}`, {
                method: 'POST',
                body
            });

            // После успешного добавления обновляем корзину
            await fetchCart(token);
            return response;
        } catch (error) {
            console.error('Error adding to cart:', error);
            throw error;
        }
    };

    return {
        fetchAddToCart
    };
};