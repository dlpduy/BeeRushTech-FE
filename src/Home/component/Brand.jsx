// src/components/Brand/Brand.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from './Brand.module.css';

const Brand = () => {
    const navigate = useNavigate();

    const handleBrandClick = (brand) => {
        // Scroll to the top before navigating
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate(`/category`, { state: { brand } });
    };

    const brands = [
        { name: "Apple",  logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/7cfd7b6f99cf6b4c7faa8a1194af89d970e889543a0e59af5d37232ca12dcad7?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c" },
        { name: "Samsung", logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/49fea4f9812ffeeeb87ec4a5d84752a45f0c349ade3861a09b363a247ec7aaae?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c" },
        { name: "Fujifilm", logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/47217084a102afc657dc0a09ded6c6b3780f31eeb2d01c7b53443c2f9940711f?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c" },
        { name: "Sony", logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/60fc728e64340faa5ea3fc5994df5a787f14d34dc695194ec3679b1912c1ba62?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c" },
        { name: "Dji", logo: "https://cdn.builder.io/api/v1/image/assets/TEMP/9bb871d3857bc37ef20bbd3ac83e721ff05be7002239325871767dcda668798c?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c" }
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
