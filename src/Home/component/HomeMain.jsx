import React from "react";
import styles from './HomeMain.module.css'



export const HomeMain = () => {

    return (
        <div className={styles.homemain}>
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
                <div className={styles.rentButton}> 
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
                    <div className={styles.data}>30.000+</div>
                    <div className={styles.dataContent}> Happy Customers</div>
                </div>
            
            </div>
        </div>
    );

}

export default HomeMain;