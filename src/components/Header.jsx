import React from "react";
import MiniCart from "./MiniCart";
import styles from "./Header.module.css";

const Header = ({ cart, onUpdateQuantity, onRemoveItem }) => {
	return (
		<div className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<div className={styles.cartButton}>
					<MiniCart cart={cart} onUpdateQuantity={onUpdateQuantity} onRemoveItem={onRemoveItem} />
				</div>
			</div>
		</div>
	);
};

export default Header;
