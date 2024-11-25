import React, { useState } from "react";
import CartItem from "./CartItem";
import styles from "./MiniCart.module.css";

/**
 * MiniCart Component
 *
 * Displays a cart button with a dynamic count of items in the cart. Clicking the button toggles
 * a pop-up showing the cart items, which closes when the mouse leaves the pop-up area.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.cart - The current state of the shopping cart.
 * @param {Function} props.onUpdateQuantity - Callback to update the quantity of items in the cart.
 * @param {Function} props.onRemoveItem - Callback to remove items from the cart.
 */
const MiniCart = ({ cart, onUpdateQuantity, onRemoveItem }) => {
	// State to track whether the cart pop-up is visible
	const [isCartVisible, setIsCartVisible] = useState(false);

	/**
	 * Toggles the visibility of the cart pop-up.
	 */
	const handleCartClick = () => {
		setIsCartVisible((prev) => !prev); // Toggle visibility on each click
	};

	/**
	 * Hides the cart pop-up when the mouse leaves the pop-up area.
	 */
	const handleMouseLeave = () => {
		setIsCartVisible(false);
	};

	/**
	 * Calculates the total number of items in the cart by summing up the quantity of each item.
	 */
	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<div style={{ position: "relative" }}>
			{/* Cart Button */}
			<button onClick={handleCartClick} className={styles.cartButton}>
				My Cart ({totalItems}) {/* Displays the total number of items in the cart */}
			</button>

			{/* Cart Pop-up */}
			{isCartVisible && (
				<div
					className={styles.cartPopUp}
					onMouseLeave={handleMouseLeave} // Close the pop-up when mouse leaves
				>
					{cart.length === 0 ? (
						<p className={styles.emptyCart}>Your cart is empty.</p>
					) : (
						<ul className={styles.cartList}>
							{/* Map over the cart items and render a CartItem component for each */}
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
