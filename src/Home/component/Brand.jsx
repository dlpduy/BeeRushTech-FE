// src/components/Brand/Brand.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Brand.module.css';

const Brand = () => {
    const navigate = useNavigate();

    const handleBrandClick = (brand) => {
        // Chuyển hướng đến trang Category và có thể truyền thêm dữ liệu thương hiệu nếu cần
        navigate(`/Category`, { state: { brand } });
    };

    return (
        <div className={styles.brandContainer}>
            <div className={styles.logo} onClick={() => handleBrandClick("Apple")}>Apple</div>
            <div className={styles.logo} onClick={() => handleBrandClick("Samsung")}>Samsung</div>
            <div className={styles.logo} onClick={() => handleBrandClick("Fujifilm")}>Fujifilm</div>
            <div className={styles.logo} onClick={() => handleBrandClick("Sony")}>Sony</div>
            <div className={styles.logo} onClick={() => handleBrandClick("Nikon")}>Nikon</div>
        </div>
    );
};

export default Brand;
