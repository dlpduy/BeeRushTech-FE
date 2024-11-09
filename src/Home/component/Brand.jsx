import React from "react";
import styles from './Brand.module.css';

const Brand = () =>{
    return (
    <div className={styles.brandContainer}>
        <div className={styles.logo}>Apple</div>
        <div className={styles.logo}>SamSung</div>
        <div className={styles.logo}>Fujifilm</div>
        <div className={styles.logo}>Sony</div>
        <div className={styles.logo}>Nikon</div>
    </div>
    );
}

export default Brand;