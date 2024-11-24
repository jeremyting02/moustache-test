import React, { useState, useEffect } from "react";
import styles from "./ProductDetails.module.css";

const ProductDetails = ({ onAddToCart }) => {
	const [product, setProduct] = useState(null);
	const [selectedSize, setSelectedSize] = useState("");
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchProduct = async () => {
			const cachedProduct = JSON.parse(localStorage.getItem("product"));
			const cacheTimestamp = localStorage.getItem("cacheTimestamp");

			if (cachedProduct && new Date() - new Date(cacheTimestamp) < 3600000) {
				setProduct(cachedProduct);
				return;
			}

			try {
				const response = await fetch("https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product");
				const data = await response.json();
				localStorage.setItem("product", JSON.stringify(data));
				localStorage.setItem("cacheTimestamp", new Date().toISOString());
				setProduct(data);
			} catch (err) {
				console.error("Failed to fetch product", err);
			}
		};

		fetchProduct();
	}, []);

	const handleAddToCart = () => {
		if (!selectedSize) {
			setError("Please select a size.");
			return;
		}
		setError("");
		onAddToCart({ ...product, size: selectedSize, quantity: 1 });
	};

	if (!product) return <p>Loading...</p>;

	return (
		<div className={styles.productDetails}>
			<div className={styles.productImageDiv}>
				<img src={product.imageURL} alt={product.title} />
			</div>
			<div className={styles.productInfo}>
				<h2 className={styles.productTitle}>{product.title}</h2>
				<p className={styles.productPrice}>${product.price.toFixed(2)}</p>
				<p>{product.description}</p>

				{/* Size Line */}
				<div className={styles.sizeLine}>
					<span className={styles.sizeText}>
						SIZE<span className={styles.required}>*</span> {selectedSize || ""}
					</span>
				</div>

				<div className={styles.sizeButtons}>
					{product.sizeOptions.map((size) => (
						<button key={size.id} onClick={() => setSelectedSize(size.label)} className={selectedSize === size.label ? styles.selected : ""}>
							{size.label}
						</button>
					))}
				</div>

				{error && <p className={styles.error}>{error}</p>}
				<button onClick={handleAddToCart} className={styles.addToCart}>
					ADD TO CART
				</button>
			</div>
		</div>
	);
};

export default ProductDetails;
