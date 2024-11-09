import React from "react";
import { Footer } from "../MutualComponents/Footer/Footer";
import { HeaderLog } from "../LoginComponent/HeaderLog";
import HomeMain from "./component/HomeMain";
import Brand from "./component/Brand";
import NewProduct from "./component/NewProduct";
import HotItem from "./component/HotItem";
import Review from "./component/Review"
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";


import styles from "./HomePage.module.css"

export const HomePage = () => {



    return (
        <main className={styles.homepage}>    
        <HeaderLog/>
        
        <HomeMain/>
        <Brand/>
        <NewProduct/>
        <div className={styles.divider}></div>
        <HotItem/>
        <div className={styles.divider}></div>
        <Review/>
        <div className={styles.container}>
        <NewsletterSection/>
        </div>
        <Footer/>
        </main>
    );
}

export default HomePage;