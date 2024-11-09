import React from "react";
import { Header } from '../../MutualComponents/Header/Header'
import { Footer } from "../../MutualComponents/Footer/Footer";
import  NewsletterSection  from "../../MutualComponents/Newsletter/Newsletter"
import ProductDetail from "./component/ProductDetail";

import styles from './ProductInfo.module.css'


const ProductInfo = () => {

    return (
        <main className={styles.ProductInfo}>
        <Header/>
        <div className={styles.container}>
        <h1 className={styles.title}>Your cart</h1>
        <ProductDetail/>
        <NewsletterSection/>
        </div>
        <Footer/>
        </main>
    );
}

export default ProductInfo;