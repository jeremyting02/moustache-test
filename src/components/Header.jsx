import React from "react";
import MiniCart from "./MiniCart";
import styles from "./Header.module.css";

/**
 * Header Component
 *
 * Displays the application's header, including a MiniCart component for managing and viewing the cart.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.cart - The current state of the shopping cart.
 * @param {Function} props.onUpdateQuantity - Callback to update the quantity of items in the cart.
 * @param {Function} props.onRemoveItem - Callback to remove items from the cart.
 */
const Header = ({ cart, onUpdateQuantity, onRemoveItem }) => {
	return (
		<div className={styles.headerContainer}>
			{/* Container for header content */}
			<div className={styles.headerContent}>
				{/* MiniCart button */}
				<div className={styles.cartButton}>
					<MiniCart cart={cart} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
				</div>
			</div>
		</div>
	);
};

export default Header;
