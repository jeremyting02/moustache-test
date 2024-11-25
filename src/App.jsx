import React, { useState, useEffect } from "react";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import styles from "./App.module.css";

const App = () => {
	// State to manage the shopping cart, initialized as an empty array
	const [cart, setCart] = useState(() => {
		// Retrieve the cart from localStorage when the component initializes
		const storedCart = localStorage.getItem("cart");
		return storedCart ? JSON.parse(storedCart) : [];
	});

	// Persist the cart in localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(cart));
	}, [cart]);

	/**
	 * Adds a product to the cart.
	 * If the product with the same id and size already exists, increments its quantity.
	 * Otherwise, adds the product as a new item in the cart.
	 * @param {Object} product - The product to be added to the cart.
	 */
	const handleAddToCart = (product) => {
		setCart((prevCart) => {
			// Check if the product with the same id and size already exists in the cart
			const existingItem = prevCart.find((item) => item.id === product.id && item.size === product.size);

			if (existingItem) {
				// Increment quantity if product exists
				return prevCart.map((item) => (item === existingItem ? { ...item, quantity: item.quantity + 1 } : item));
			}

			// Add the new product to the cart
			return [...prevCart, product];
		});
	};

	/**
	 * Updates the quantity of a product in the cart.
	 * Removes the product if the quantity falls to zero.
	 * @param {Object} product - The product to update.
	 * @param {number} delta - The change in quantity (e.g., +1 or -1).
	 */
	const handleUpdateQuantity = (product, delta) => {
		setCart((prevCart) =>
			// Update the quantity of the matching product
			prevCart
				.map((item) => (item === product ? { ...item, quantity: item.quantity + delta } : item))
				// Remove items with a quantity of 0
				.filter((item) => item.quantity > 0)
		);
	};

	/**
	 * Removes a specific item from the cart.
	 * @param {Object} item - The cart item to be removed.
	 */
	const handleRemoveItem = (item) => {
		setCart((prevCart) =>
			// Filter out the item to be removed
			prevCart.filter((cartItem) => !(cartItem.id === item.id && cartItem.size === item.size))
		);
	};

	return (
		<div className={styles.appRoot}>
			<div className={styles.appRoot2}>
				{/* Header component displays the cart and passes through updates/removals */}
				<Header cart={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} />

				{/* ProductDetails component displays product information and allows adding to cart */}
				<ProductDetails onAddToCart={handleAddToCart} />
			</div>
		</div>
	);
};

export default App;
