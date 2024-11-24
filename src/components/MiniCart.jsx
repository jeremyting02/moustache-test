import React from "react";

const MiniCart = ({ cart, onUpdateQuantity }) => {
  const handleQuantityChange = (product, delta) => {
    onUpdateQuantity(product, delta);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Mini Cart</h2>
      {cart.map((item) => (
        <div key={`${item.id}-${item.size}`}>
          <p>
            {item.title} - {item.size} (${item.price.toFixed(2)})
          </p>
          <div>
            <button onClick={() => handleQuantityChange(item, -1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => handleQuantityChange(item, 1)}>+</button>
          </div>
        </div>
      ))}
      <h3>Total: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default MiniCart;
