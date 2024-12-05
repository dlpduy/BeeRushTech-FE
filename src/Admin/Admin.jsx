import React from 'react';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';
import { Outlet, NavLink } from 'react-router-dom';
import api from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Admin.module.css'



export const Admin =() => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); 
    const handleLogout = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
          if (!token) {
            alert("You are not logged in. Please log in again.");
            return;
          }
      
          // Gọi API Logout
          const response = await api.post(
            "/auth/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`, // Gửi token qua header
              },
            }
          );
            console.log(response);
          if (response.statusCode === 200) {
            alert("Logout successful");
            localStorage.clear(); // Xóa token khỏi localStorage
            navigate("/"); // Điều hướng về trang đăng nhập
          }
        } catch (error) {
          console.error("Logout failed:", error);
          alert("An error occurred during logout.");
        } finally {
          setLoading(false);
        }
      };

    return(
        
        <main className={styles.admin}>
            <div className={styles.container}>
            <div className={styles.content}>
            <Header/>
            <div className={styles.divider} />           
                <nav className={styles.breadcrumb}>
                    <button className={styles.breadcrumbLink} aria-label="Home"> Home </button>
                    <img 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/b2f5eb0a4928570b7fed31b03a3380bdd7847d7602a5565615f9e54341907dfa?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                        alt="" 
                        className={styles.breadcrumbIcon} 
                    />   
                    <span className={styles.breadcrumbCurrent}>Admin</span> 
                </nav>               
            </div>

            <section className={styles.manageContent}>
            <div className={styles.breadcrumb}>
                <div className={styles.manageLayout}>
                    
                    <aside className={styles.sidebar}>
                    <h1 className={styles.pageTitle}>Manage</h1>
                        <nav className={styles.sidebarContent}>
                        <NavLink to="/Admin/product" className={({ isActive }) => isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem}>Product</NavLink>
                        <NavLink to="/Admin/order" className={({ isActive }) => isActive ? `${styles.sidebarItem} ${styles.active}` : styles.sidebarItem}>Order</NavLink>
                        <button onClick={handleLogout} className={styles.logoutButton}>
                        {loading ? "Logging out..." : "Logout"}
    </button>
                        </nav>
                </aside>
                <main className={styles.mainContent}>
                    <div className={styles.manageDetails}>
                    <Outlet/>
                    </div>
                </main> 
                </div>
                </div>
            </section>   
            </div>
            <Footer/>
        </main>
    );
}



export default Admin;