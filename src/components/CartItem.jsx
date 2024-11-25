import React from "react";
import styles from "./CartItem.module.css";

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
	return (
		<li className={styles.cartItem}>
			{/* Item Image */}
			<img src={item.imageURL} alt={item.title} className={styles.itemImage} />

			{/* Item Details */}
			<div className={styles.itemDetails}>
				{/* Item Name */}
				<p className={styles.itemName}>{item.title}</p>

				{/* Quantity and Price */}
				<p className={styles.itemQuantityPrice}>
					{item.quantity}x <span className={styles.itemPrice}>${item.price.toFixed(2)}</span>
				</p>

				{/* Item Size */}
				<p className={styles.itemSize}>Size: {item.size}</p>

				<div className={styles.spacer} />

				{/* Controls */}
				<div className={styles.itemControls}>
					<button className={styles.quantityButton} onClick={() => onUpdateQuantity(item, 1)}>
						+
					</button>
					<button className={styles.quantityButton} onClick={() => onUpdateQuantity(item, -1)}>
						-
					</button>
					<button className={styles.removeButton} onClick={() => onRemoveItem(item)}>
						REMOVE
					</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
