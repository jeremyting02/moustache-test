import React, { useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";

/**
 * ProductDetails Component
 *
 * Displays the product details, including image, name, price, description, and size options.
 * Allows users to select a size and add the product to the cart.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onAddToCart - Callback function to add a product to the cart.
 */
const ProductDetails = ({ onAddToCart }) => {
	// State to store the product details fetched from the API
	const [product, setProduct] = useState(null);

	// State to store the selected size for the product
	const [selectedSize, setSelectedSize] = useState("");

	// State to store an error message if a size is not selected
	const [error, setError] = useState("");

	// Fetch product details from the API or local storage on component mount
	useEffect(() => {
		const fetchProduct = async () => {
			// Check for cached product data in local storage
			const cachedProduct = JSON.parse(localStorage.getItem("product"));
			const cacheTimestamp = localStorage.getItem("cacheTimestamp");

			// Use cached data if it's less than 1 hour old
			if (cachedProduct && new Date() - new Date(cacheTimestamp) < 3600000) {
				setProduct(cachedProduct);
				return;
			}

			// Fetch product data from the API
			try {
				const response = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product");
				const data = await response.json();

				// Cache the fetched data in local storage
				localStorage.setItem("product", JSON.stringify(data));
				localStorage.setItem("cacheTimestamp", new Date().toISOString());

				// Update the product state with the fetched data
				setProduct(data);
			} catch (err) {
				console.error("Failed to fetch product", err);
			}
		};

		fetchProduct();
	}, []);

	/**
	 * Handles adding the product to the cart.
	 * Validates that a size is selected before proceeding.
	 */
	const handleAddToCart = () => {
		if (!selectedSize) {
			// Display an error message if no size is selected
			setError("Please select a size.");
			return;
		}

		// Clear any previous error messages
		setError("");

		// Call the onAddToCart callback with the product details and selected size
		onAddToCart({ ...product, size: selectedSize, quantity: 1 });
	};

	// Display a loading message while the product data is being fetched
	if (!product) return <p>Loading...</p>;

	return (
		<div className={styles.productDetails}>
			{/* Product Image */}
			<div className={styles.productImageDiv}>
				<img src={product.imageURL} alt={product.title} />
			</div>

			{/* Product Information */}
			<div className={styles.productInfo}>
				{/* Product Title */}
				<h2 className={styles.productTitle}>{product.title}</h2>

				{/* Product Price */}
				<p className={styles.productPrice}>${product.price.toFixed(2)}</p>

				{/* Product Description */}
				<p>{product.description}</p>

				{/* Size Selection Line */}
				<div className={styles.sizeLine}>
					<span className={styles.sizeText}>
						SIZE<span className={styles.required}>*</span> <span className={styles.selectedSize}>{selectedSize || ""}</span>
					</span>
				</div>

				{/* Size Selection Buttons */}
				<div className={styles.sizeButtons}>
					{product.sizeOptions.map((size) => (
						<button key={size.id} onClick={() => setSelectedSize(size.label)} className={selectedSize === size.label ? styles.selected : ""}>
							{size.label}
						</button>
					))}
				</div>

				{/* Error Message */}
				{error && <p className={styles.error}>{error}</p>}

				{/* Add to Cart Button */}
				<button onClick={handleAddToCart} className={styles.addToCart}>
					ADD TO CART
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;
