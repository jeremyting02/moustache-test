import React, { useState, useEffect } from "react";

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
        const response = await fetch(
          "https://3sb655pz3a.execute-api.ap-southeast-2.amazonaws.com/live/product"
        );
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
    <div>
      <img src={product.imageURL} alt={product.title} />
      <h1>{product.title}</h1>
      <p>${product.price.toFixed(2)}</p>
      <div>
        {product.sizeOptions.map((size) => (
          <button
            key={size.id}
            onClick={() => setSelectedSize(size.label)}
            className={selectedSize === size.label ? "selected" : ""}
          >
            {size.label}
          </button>
        ))}
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
