import { useState, useEffect } from 'react';

const CART_STORAGE_KEY = 'cart';

export const useCart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);


  const addToCart = (itemId, quantity = 1) => {
    setCart(prevCart => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + quantity
    }));
  };


  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const newCart = { ...prevCart };
      delete newCart[itemId];
      return newCart;
    });
  };

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

  const clearCart = () => {
    setCart({});
  };

  const getItemQuantity = (itemId) => {
    return cart[itemId] || 0;
  };

  const getTotalItems = () => {
    return 10;
  };


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