import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(0); // Shared quantity state
  const [totalPrice, setTotalPrice] = useState(0); // Shared total price state

  console.log('CartContext initialized:', { quantity, totalPrice }); // Debugging

  return (
    <CartContext.Provider value={{ quantity, setQuantity, totalPrice, setTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
//                     </div>