import React from 'react';

const CartItem = ({ item, updateCart }) => {
  const handleQuantityChange = (quantity) => {
    updateCart(item, quantity);
  };

  return (
    <li className="cart-item">
      <p>{item.name} - {item.size}</p>
      <p>${item.price.toFixed(2)} x {item.quantity}</p>
      <input
        type="number"
        value={item.quantity}
        min="1"
        onChange={(e) => handleQuantityChange(Number(e.target.value))}
      />
    </li>
  );
};

export default CartItem;
