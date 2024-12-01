import React, { useEffect, useState } from 'react';
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from '../../MutualComponents/Footer/Footer';
import api from '../../api'; // Import API từ file api.js
import styles from './User.module.css';

export const User = () => {
  const [user, setUser] = useState(null); // Lưu thông tin người dùng
  const [orders, setOrders] = useState([]); // Lưu danh sách đơn hàng
  const [loadingUser, setLoadingUser] = useState(true); // Trạng thái loading cho thông tin người dùng
  const [loadingOrders, setLoadingOrders] = useState(true); // Trạng thái loading cho đơn hàng

  // Lấy thông tin người dùng
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user/profile'); // Gọi API để lấy thông tin người dùng
        setUser(response.data); // Lưu thông tin người dùng
        setLoadingUser(false); // Dừng loading sau khi lấy dữ liệu thành công
      } catch (error) {
        console.error('Error fetching user data', error);
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, []);

  // Lấy đơn hàng của người dùng
  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const response = await api.get('/orders'); // Gọi API để lấy danh sách đơn hàng
        setOrders(response.data); // Lưu danh sách đơn hàng
        setLoadingOrders(false); // Dừng loading sau khi lấy dữ liệu thành công
      } catch (error) {
        console.error('Error fetching orders', error);
        setLoadingOrders(false);
      }
    };

    fetchUserOrders();
  }, []);

  return (
    <main className={styles.user}>
      <div className={styles.container}>
        <div className={styles.content}>
          <Header />
          <div className={styles.divider} />

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <button className={styles.breadcrumbLink} aria-label="Home"> User </button>
            <img 
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5eb0a4928570b7fed31b03a3380bdd7847d7602a5565615f9e54341907dfa?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
              alt="" 
              className={styles.breadcrumbIcon} 
            />
            <span className={styles.breadcrumbCurrent}>Customer</span>
          </nav>
        </div>

        {/* Main content */}
        <section className={styles.manageContent}>
          <div className={styles.manageLayout}>
            <aside className={styles.sidebar}>
              <h1 className={styles.pageTitle}>Profile</h1>

              {/* Hiển thị thông tin người dùng */}
              {loadingUser ? (
                <p>Loading user data...</p>
              ) : user ? (
                <div className={styles.userInfo}>
                  <h2>{user.fullName}</h2>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phoneNumber}</p>
                  <p>Address: {user.address}</p>
                </div>
              ) : (
                <p>Failed to load user data.</p>
              )}
            </aside>

            <main className={styles.mainContent}>
              <div className={styles.manageInfo}>
                <h2>Your Orders</h2>

                {/* Hiển thị danh sách đơn hàng */}
                {loadingOrders ? (
                  <p>Loading orders...</p>
                ) : orders.length > 0 ? (
                  <ul className={styles.orderList}>
                    {orders.map((order) => (
                      <li key={order.id} className={styles.orderItem}>
                        <div className={styles.orderDetails}>
                          <p>Order ID: {order.id}</p>
                          <p>Status: {order.status}</p>
                          <p>Total: ${order.total}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You have no orders yet.</p>
                )}
              </div>
            </main>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default User;
