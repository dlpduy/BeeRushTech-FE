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
    const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10, bg11, bg12]; // Mảng chứa các hình ảnh background

    const [currentIndex, setCurrentIndex] = useState(0); // Quản lý chỉ số ảnh hiện tại
    const [fade, setFade] = useState(true); // Trạng thái để điều khiển hiệu ứng mờ

    useEffect(() => {
        // Hàm thực hiện chuyển đổi ảnh
        const interval = setInterval(() => {
            setFade(false); // Bắt đầu hiệu ứng mờ
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % backgrounds.length); // Cập nhật chỉ số ảnh
                setFade(true); // Kích hoạt mờ vào ảnh mới
            }, 2000); // Hiệu ứng fade out diễn ra trong 2 giây
        }, 5000); // Chuyển đổi ảnh mỗi 5 giây

        return () => clearInterval(interval); // Dọn dẹp khi component bị unmount
    }, [backgrounds.length]);

    const handleRentNowClick = () => {
        // Cuộn lên đầu trước khi điều hướng
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
        navigate("/category");
    };

    return (
        <div className={styles.homemain}>
            {/* Phần tử nền với hiệu ứng mờ */}
            <div
                className={styles.backgroundLayer}
                style={{
                    backgroundImage: `url(${backgrounds[currentIndex]})`,
                    opacity: fade ? 1 : 0, // Điều chỉnh độ mờ cho nền
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'opacity 2s ease-in-out', // Hiệu ứng mờ mượt mà
                }}
            ></div>

            {/* Nội dung chính */}
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
                    <div className={styles.data}>10k+</div>
                    <div className={styles.dataContent}> Happy Customers</div>
                </div>
            </div>
        </div>
    );
};
