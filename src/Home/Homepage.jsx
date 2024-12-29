import React from "react";
import { Helmet } from "react-helmet";
import { Footer } from "../MutualComponents/Footer/Footer";
import { Header } from "../MutualComponents/Header/Header";
import { HomeMain } from "./component/HomeMain";
import Brand from "./component/Brand";
import NewProduct from "./component/NewProduct";
import HotItem from "./component/HotItem";
import NewsletterSection from "../MutualComponents/Newsletter/Newsletter";
import styles from "./HomePage.module.css";
 
export const HomePage = () => {
    return (
        <main className={styles.homepage}>
            {/* Meta tags và tiêu đề cho SEO */}
            <Helmet>
                <title>Thuê Máy Ảnh, Flycam & Thiết Bị Công Nghệ - Bee RushTech</title>
                <meta 
                    name="description" 
                    content="Dịch vụ cho thuê máy ảnh, flycam, và các thiết bị công nghệ cao cấp. Bee RushTech - nhanh chóng, uy tín, và tiện lợi. Đặt ngay hôm nay!" 
                />
                <meta 
                    name="keywords" 
                    content="thuê máy ảnh, thuê flycam, thiết bị công nghệ, cho thuê máy ảnh, dịch vụ thuê thiết bị, Bee RushTech" 
                />
                <meta name="author" content="Bee RushTech" />
                <meta name="robots" content="index, follow" />
                <meta property="og:title" content="Thuê Máy Ảnh, Flycam & Thiết Bị Công Nghệ - Bee RushTech" />
                <meta 
                    property="og:description" 
                    content="Khám phá dịch vụ cho thuê thiết bị công nghệ như máy ảnh, flycam chất lượng cao tại Bee RushTech. Đặt ngay để nhận ưu đãi đặc biệt!" 
                />
            </Helmet>

            <Header />
            <HomeMain />
            <Brand />
            <div className={styles.container}>
                <NewProduct />
                <div className={styles.divider}></div>
                <HotItem />
                <NewsletterSection />
            </div>
            <Footer />
        </main>
    );
};

export default HomePage;
