import React, { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";

const App = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, product];
    });
  };

  const handleUpdateQuantity = (product, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item === product ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div>
      <Header cart={cart} onUpdateQuantity={handleUpdateQuantity} />
      <ProductDetails onAddToCart={handleAddToCart} />
    </div>
  );
};

export default App;
