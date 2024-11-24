import React from "react";
import MiniCart from "./MiniCart";

const Header = ({ cart, onUpdateQuantity }) => {

  return (
    <div>
      <MiniCart cart={cart} onUpdateQuantity={onUpdateQuantity} />
    </div>
  );
};

export default Header;
