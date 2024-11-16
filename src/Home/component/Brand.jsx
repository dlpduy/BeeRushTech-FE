// src/components/Brand/Brand.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Brand.module.css';

const Brand = () => {
    const navigate = useNavigate();

    const handleBrandClick = (brand) => {
        // Navigate to Category page and pass brand data
        navigate(`/category`, { state: { brand } });
    };

    const brands = [
        { name: "Apple", logo: "https://via.placeholder.com/100?text=Apple" },
        { name: "Samsung", logo: "https://via.placeholder.com/100?text=Samsung" },
        { name: "Fujifilm", logo: "https://via.placeholder.com/100?text=Fujifilm" },
        { name: "Sony", logo: "https://via.placeholder.com/100?text=Sony" },
        { name: "Nikon", logo: "https://via.placeholder.com/100?text=Nikon" }
    ];

    return (
        <div className={styles.brandContainer}>
            {brands.map((brand) => (
                <img
                    key={brand.name}
                    src={brand.logo}
                    alt={brand.name}
                    className={styles.logo}
                    onClick={() => handleBrandClick(brand.name)}
                />
            ))}
        </div>
    );
};

export default Brand;
