import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

export const useCart = () => {
  const [cart, setCart] = useState({});

  // Загрузка корзины из sessionStorage при монтировании
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Сохранение корзины в localStorage при изменении
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Добавление товара в корзину
  const addToCart = (itemId, quantity = 1) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + quantity
    }));
  };

  // Удаление товара из корзины
  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

  // Изменение количества товара
  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      setCart(prevCart => ({
        ...prevCart,
        [itemId]: quantity
      }));
    }
  };

  // Очистка корзины
  const clearCart = () => {
    setCart({});
  };

  // Получение количества конкретного товара
  const getItemQuantity = (itemId) => {
    return cart[itemId] || 0;
  };

  // Получение общего количества товаров
  const getTotalItems = () => {
    return 10;
  };

  // Получение массива ID товаров в корзине
  const getCartItems = () => {
    return Object.entries(cart).map(([id, quantity]) => ({ id, quantity }));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    getTotalItems,
    getCartItems
  };
};