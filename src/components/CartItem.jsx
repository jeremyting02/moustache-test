import React from "react";
import styles from "./CartItem.module.css";

/**
 * CartItem Component
 *
 * Represents an individual item in the cart, displaying its details and providing controls
 * to update its quantity or remove it from the cart.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.item - The cart item to display.
 * @param {Function} props.onUpdateQuantity - Callback to update the item's quantity.
 * @param {Function} props.onRemoveItem - Callback to remove the item from the cart.
 */
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
	return (
		<li className={styles.cartItem}>
			{/* Display the product image */}
			<img src={item.imageURL} alt={item.title} className={styles.itemImage} />

			{/* Container for item details */}
			<div className={styles.itemDetails}>
				{/* Item name */}
				<p className={styles.itemName}>{item.title}</p>

				{/* Display quantity and price */}
				<p className={styles.itemQuantityPrice}>
					{item.quantity}x <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
				</p>

				{/* Display the selected size */}
				<p className={styles.itemSize}>Size: {item.size}</p>

				{/* Spacer to push controls to the bottom */}
				<div className={styles.spacer} />

				{/* Controls for updating or removing the item */}
				<div className={styles.itemControls}>
					{/* Increment quantity */}
					<button className={styles.quantityButton} onClick={() => onUpdateQuantity(item, 1)}>
						+
					</button>

					{/* Decrement quantity */}
					<button className={styles.quantityButton} onClick={() => onUpdateQuantity(item, -1)}>
						-
					</button>

					{/* Remove the item completely */}
					<button className={styles.removeButton} onClick={() => onRemoveItem(item)}>
						REMOVE
					</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
