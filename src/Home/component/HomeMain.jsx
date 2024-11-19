import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from './HomeMain.module.css';

// Import các hình ảnh background
import bg1 from "../../Background/1.png";
import bg2 from "../../Background/2.png";
import bg3 from "../../Background/3.png";
import bg4 from "../../Background/4.png";
import bg5 from "../../Background/5.png";
import bg6 from "../../Background/6.png";
import bg7 from "../../Background/7.png";
import bg8 from "../../Background/8.png";
import bg9 from "../../Background/9.png";
import bg10 from "../../Background/10.png";
import bg11 from "../../Background/11.png";
import bg12 from "../../Background/12.png";

export const HomeMain = () => {
    const navigate = useNavigate();

    const [currentBackground, setCurrentBackground] = useState(bg1); // Bắt đầu với hình ảnh đầu tiên
    const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12]; // Mảng chứa các hình ảnh background

    useEffect(() => {
        // Tạo hiệu ứng chuyển ảnh background mỗi 2 giây
        const interval = setInterval(() => {
            setCurrentBackground((prevBackground) => {
                // Lấy chỉ số hiện tại của ảnh background và chuyển sang ảnh tiếp theo
                const currentIndex = backgrounds.indexOf(prevBackground);
                const nextIndex = (currentIndex + 1) % backgrounds.length;
                return backgrounds[nextIndex];
            });
        }, 5000); // Chuyển đổi mỗi 4 giây

        return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
    }, [backgrounds]);

    const handleRentNowClick = () => {
        // Cuộn lên đầu trước khi điều hướng
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        navigate("/category");
    };

    return (
        <div
            className={styles.homemain}
            style={{
                backgroundImage: `url(${currentBackground})`, // Áp dụng background từ state
                backgroundSize: 'cover', // Đảm bảo ảnh background bao phủ toàn bộ
                backgroundPosition: 'center',
                transition: 'background-image 1s ease-in-out', // Thêm hiệu ứng chuyển ảnh mượt mà
            }}
        >
            <div className={styles.mainContent}>
                <div>
                    EVERYTHING 
                    <div className={styles.containerC}>
                        YOU <div className={styles.bold}>NEED,</div>
                    </div>
                    DELIVER 
                    <div className={styles.containerC}>
                        WITH <div className={styles.bold}>SPEED.</div>
                    </div>
                </div>
            </div>
            <div className={styles.content}>
                <div>
                    Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </div>
                <div className={styles.paddingButton}>
                    <div className={styles.rentButton} onClick={handleRentNowClick}> 
                        <div className={styles.rentContent}>
                            Rent Now
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.statistic}>
                <div className={styles.column}>
                    <div className={styles.data}>200+</div>
                    <div className={styles.dataContent}> International Brands</div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.column}>
                    <div className={styles.data}>2000+</div>
                    <div className={styles.dataContent}> High-Quality Products</div>
                </div>
                <div className={styles.divider}></div>
                <div className={styles.column}>
                    <div className={styles.data}>30,000+</div>
                    <div className={styles.dataContent}> Happy Customers</div>
                </div>
            </div>
        </div>
    );
}

export default HomeMain;
