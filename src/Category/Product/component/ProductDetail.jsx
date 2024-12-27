import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import api from "../../../api"; // API instance
import styles from "./ProductDetail.module.css";
import Loading from "../../../MutualComponents/Loading/Loading";

function getColorFromString(color) {
  switch (color.toLowerCase()) {
    case "red":
      return "#FF0000";
    case "blue":
      return "#0000FF";
    case "green":
      return "#008000";
    case "yellow":
      return "#FFFF00";
    default:
      return "#000000";
  }
}

const ProductDetail = ({ addToCart }) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await api.get(`/products/${productId}`);
        if (response.data) {
          setProduct(response.data);
        }
      } catch (err) {
        console.error("Error fetching product details:", err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => (type === "increase" ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const imageUrl = imageError ? "/public/logo.png" : (product?.image || "/public/logo.png");

  if (isLoading) {
    return <div><Loading /></div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.product_detail}>
      {/* Meta Tags for SEO */}
      <Helmet>
        <title>{`Thuê ${product.name} - Giá Tốt | Bee RushTech`}</title>
        <meta
          name="description"
          content={`${product.description}. Thuê ngay tại Bee RushTech với giá chỉ ${product.price}.`}
        />
      </Helmet>

      <section className={styles.pic}>
        <img
          src={imageUrl}
          alt={`${product.name} - Thuê giá rẻ tại Bee RushTech`}
          onError={handleImageError}
          className={styles.product_img}
        />
      </section>

      <aside className={styles.detail}>
        <div className={styles.product_detail_info}>
          <h1 className={styles.name}>{product.name}</h1>
          <h3 className={styles.brand}>Brand: {product.brand}</h3>
          <p className={styles.price}>Price: {product.price}</p>
          <p className={styles.description}>Description: {product.description}</p>
          <p className={styles.quantity}>Quantity: {product.quantity}</p>

          <div className={styles.Rent}>
            <div className={styles.quantity_section}>
              <button
                onClick={() => handleQuantityChange("decrease")}
                className={styles.quantity_button}
              >
                -
              </button>
              <span className={styles.quantity}>{quantity}</span>
              <button
                onClick={() => handleQuantityChange("increase")}
                className={styles.quantity_button}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default ProductDetail;
