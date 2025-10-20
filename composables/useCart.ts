// composables/useCart.ts
export const useCart = () => {
    // Используем useState вместо ref для shared состояния
    const cart = useState('cart', () => []);
    const config = useRuntimeConfig()
    const fetchCart = async (token: string) => {
        try {
            const response = await $fetch(`${config.public.siteUrlApi}/api/shop/cart?token=${token}&domain=${config.public.siteUrlDomain}`);
            cart.value = response.data?.cart || [];
            return cart.value;
        } catch (error) {
            console.error('Error fetching cart:', error);
            cart.value = [];
            return [];
        }
    };

    return {
        fetchCart,
        cart
    };
};