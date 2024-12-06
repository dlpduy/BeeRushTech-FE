import React from "react";
import { useNavigate } from 'react-router-dom';  // Thêm hook useNavigate
import styles from './Success.module.css';
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";

const Success = () => {
    const navigate = useNavigate();  // Khởi tạo hook useNavigate

    // Hàm xử lý khi nhấn nút "Tiếp tục mua sắm"
    const handleContinueShopping = () => {
        navigate('/category');  // Chuyển hướng đến trang chủ hoặc trang bạn muốn
    }

    // Hàm xử lý khi nhấn nút "Xem đơn hàng"
    const handleViewOrder = () => {
        navigate('/user');  // Chuyển hướng đến trang đơn hàng
    }

    return(
        <div className={styles.container}>
            <Header/>
            
            <div className={styles.content}>
                <div className={styles.successMessage}>
                    <h2>Thanh toán thành công!</h2>
                    <p>Cảm ơn bạn đã mua sắm tại cửa hàng của chúng tôi. Đơn hàng của bạn đã được thanh toán thành công.</p>
                </div>
                <div className={styles.buttonContainer}>
                    <button className={styles.continueShoppingButton} onClick={handleContinueShopping}>Tiếp tục mua sắm</button>
                    <button className={styles.viewOrderButton} onClick={handleViewOrder}>Xem đơn hàng</button>
                </div>
            </div>
            
            <Footer/>
        </div>
    );
}

export default Success;
