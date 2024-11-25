import React, { useState, useCallback } from "react";
import { Header } from "../MutualComponents/Header/Header";
import { CartItem } from "./components/CartItem/CartItem";
import Checkout from "./Checkout"
import OrderSummary from "./components/OrderSummary/OrderSummary";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import { Footer } from "../MutualComponents/Footer/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Cart.module.css";

export const Cart = () => {
  const [cartItems, setCartItems] = useState([]); // Giỏ hàng mặc định trống
  const location = useLocation();
  const navigate = useNavigate();

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback(
    (product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.id === product.id);
        if (existingItem) {
          // Nếu sản phẩm đã tồn tại, tăng số lượng
          return prevItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        }
        // Thêm sản phẩm mới vào giỏ hàng
        return [...prevItems, product];
      });
    },
    [setCartItems]
  );

  // Update item quantity
  const updateQuantity = useCallback(
    (id, newQuantity) => {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    },
    [setCartItems]
  );

  // Remove item from cart
  const removeItem = useCallback(
    (id) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    },
    [setCartItems]
  );

  // Calculate costs
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = subtotal * 0.2;
  const deliveryFee = subtotal > 0 ? 15 : 0; // Delivery fee only applies if cart is not empty
  const total = subtotal - discount + deliveryFee;

  const handleCheckout = () => {
    navigate("/cart/checkout");
  };

  return (
    <main className={styles.cart}>
      <Header />

      <div className={styles.container}>
        <div className={styles.divider}></div>

        <h1 className={styles.title}>
          {location.pathname === "/cart/checkout" ? "Payment Methods" : "Your Cart"}
        </h1>

        <div className={styles.content}>
          <section className={styles.cartItems}>
            {location.pathname === "/cart/checkout" ? (
              <Checkout onPay={() => alert("Payment successful!")} />
            ) : cartItems.length ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  onQuantityChange={(newQuantity) => updateQuantity(item.id, newQuantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))
            ) : (
              <p>Your cart is empty!</p>
            )}
          </section>

          <aside className={styles.sidebar}>
            <OrderSummary
              subtotal={subtotal}
              discount={discount}
              deliveryFee={deliveryFee}
              total={total}
              isCheckout={location.pathname === "/cart/checkout"}
              onCheckout={handleCheckout}
            />
          </aside>
        </div>

        <NewsletterSection />
      </div>
      <Footer />
    </main>
  );
};
