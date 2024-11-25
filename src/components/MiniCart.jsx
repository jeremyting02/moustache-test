import React, { useState } from "react";
import CartItem from "./CartItem";
import styles from "./MiniCart.module.css";

const MiniCart = ({ cart, onUpdateQuantity, onRemoveItem }) => {
	const [isCartVisible, setIsCartVisible] = useState(false);

	const handleCartClick = () => {
		setIsCartVisible((prev) => !prev); // Toggle visibility on click
	};

	const handleMouseLeave = () => {
		setIsCartVisible(false); // Close the cart when mouse leaves
	};

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<div style={{ position: "relative" }}>
			{/* Cart Button */}
			<button onClick={handleCartClick} className={styles.cartButton}>
				My Cart ({totalItems})
			</button>

			{/* Cart Pop-up */}
			{isCartVisible && (
				<div
					className={styles.cartPopUp}
					onMouseLeave={handleMouseLeave} // Close on mouse leave
				>
					{cart.length === 0 ? (
						<p className={styles.emptyCart}>Your cart is empty.</p>
					) : (
						<ul className={styles.cartList}>
							{cart.map((item, index) => (
								<CartItem key={`${item.id}-${item.size}`} item={item} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default MiniCart;
