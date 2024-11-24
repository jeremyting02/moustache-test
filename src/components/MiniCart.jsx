import React, { useState } from "react";
import styles from "./MiniCart.module.css";

const MiniCart = ({ cart }) => {
	const [isCartVisible, setIsCartVisible] = useState(false);

	const toggleCart = () => {
		setIsCartVisible((prev) => !prev);
	};

	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<div style={{ position: "relative" }}>
			{/* Cart Button */}
			<button onClick={toggleCart} className={styles.cartButton}>
				My Cart ({totalItems})
			</button>

			{/* Cart Pop-up */}
			{isCartVisible && (
				<div className={styles.cartPopUp}>
					<h3 style={{ margin: "10px" }}>Cart Items</h3>
					{cart.length === 0 ? (
						<p style={{ margin: "10px" }}>Your cart is empty.</p>
					) : (
						<ul style={{ listStyleType: "none", padding: "10px" }}>
							{cart.map((item, index) => (
								<li
									key={index}
									style={{
										display: "flex",
										justifyContent: "space-between",
										marginBottom: "10px",
									}}
								>
									<span>
										{item.title} ({item.size})
									</span>
									<span>x{item.quantity}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			)}
		</div>
	);
};

export default MiniCart;
