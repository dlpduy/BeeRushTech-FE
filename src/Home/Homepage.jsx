import React from "react";
import { Footer } from "../MutualComponents/Footer/Footer";
import { Header } from "../MutualComponents/Header/Header";
import {HomeMain} from "./component/HomeMain";
import Brand from "./component/Brand";
import NewProduct from "./component/NewProduct";
import HotItem from "./component/HotItem";
import Review from "./component/Review"
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";


import styles from "./HomePage.module.css"

export const HomePage = () => {



    return (
        <main className={styles.homepage}>    
        <Header/>
        <HomeMain/>
        <Brand/>
        <div className={styles.container}>
        <NewProduct/>
        <div className={styles.divider}></div>
        <HotItem/>
        <Review/>
        <NewsletterSection/>
        </div>
        <Footer/>
        </main>
    );
}

export default HomePage;