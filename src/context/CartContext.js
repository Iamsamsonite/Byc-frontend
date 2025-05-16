import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    console.log('Cart items saved to localStorage:', cartItems);
  }, [cartItems]);

  const addToCart = (item) => {
    // Validate item
    if (!item.id || !item.quantity || typeof item.price !== 'number' || !item.name) {
      console.error('Invalid item added to cart:', item);
      return; // Prevent adding invalid items
    }

    const normalizedItem = {
      id: item.id,
      name: item.name || 'Unknown Product',
      price: typeof item.price === 'number' ? item.price : 0,
      quantity: item.quantity || 1,
      selectedSize: item.selectedSize || '',
      selectedColor: item.selectedColor || '',
      image: item.image || '', // Optional
      productNumber: item.productNumber || '', // Optional
    };

    setCartItems((prev) => {
      const existingItem = prev.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, normalizedItem];
    });
    console.log('Item added to cart:', normalizedItem);
  };

  const removeFromCart = (id, selectedSize, selectedColor) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
      )
    );
    console.log('Item removed from cart:', { id, selectedSize, selectedColor });
  };

  const updateQuantity = (id, selectedSize, selectedColor, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
    console.log('Quantity updated:', { id, selectedSize, selectedColor, newQuantity });
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
    console.log('Cart cleared');
  };

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (typeof item.price === 'number' ? item.price : 0) * (item.quantity || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};