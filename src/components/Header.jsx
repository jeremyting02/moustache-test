import React from "react";
import MiniCart from "./MiniCart";
import styles from "./Header.module.css";

const Header = ({ cart, onUpdateQuantity }) => {
	return (
		<div className={styles.header}>
			<MiniCart cart={cart} onUpdateQuantity={onUpdateQuantity} />
		</div>
	);
};

export default Header;
