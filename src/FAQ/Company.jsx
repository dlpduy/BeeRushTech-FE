import React from "react";
import styles from "./FAQ.module.css";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";

const Company = () => {
  return (
    <div>
    <div className={styles.container}>
      <head>
        {/* SEO Meta Tags */}
        <title>Bee RushTech - Về Chúng Tôi | Dịch Vụ Thuê Thiết Bị Công Nghệ</title>
        <meta
          name="description"
          content="Bee RushTech - Dịch vụ cho thuê thiết bị công nghệ hiện đại như máy ảnh, drone và loa thông minh. Tiết kiệm chi phí, trải nghiệm công nghệ cao dễ dàng."
        />
        <meta name="keywords" content="thuê thiết bị công nghệ, thuê máy ảnh, thuê drone, Bee RushTech, dịch vụ công nghệ" />
        <meta name="author" content="Bee RushTech Team" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.beerushtech.com/about" />
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bee RushTech",
            "url": "https://www.beerushtech.com",
            "logo": "https://www.beerushtech.com/logo.png",
            "description": "Dịch vụ cho thuê thiết bị công nghệ hiện đại như máy ảnh, drone và loa thông minh. Tiết kiệm chi phí, trải nghiệm công nghệ cao dễ dàng.",
            "foundingDate": "2024-12",
            "founders": [
              {
                "@type": "Person",
                "name": "Nhóm sinh viên khoa Máy Tính, ĐH Bách Khoa, ĐHQG HCM",
              },
            ],
            "sameAs": [
              "https://www.facebook.com/beerushtech",
              "https://www.instagram.com/beerushtech",
            ],
          })}
        </script>
      </head>
      <div className={styles.content}>
        <Header />
        <div className={styles.bee_rushtech_intro}>

        <header>
            <h1>Bee RushTech – Easy Technology 4U!!!</h1>
            <h2>Bee RushTech – Everything You Need, Delivered with Speed!!!</h2>
          </header>
          <section className={styles.intro_text}>
            <p>
              Bạn có từng rơi vào tình huống cần một chiếc máy ảnh xịn để ghi lại khoảnh khắc đáng nhớ nhưng lại không muốn chi tiền mua một chiếc mới?
              Hay bạn cần một chiếc drone để quay video cho dự án nhưng không biết phải làm sao với nó sau khi hoàn thành?
            </p>
            <p>
              <strong>Bee RushTech</strong> chính là giải pháp dành cho bạn! Chúng tôi cung cấp dịch vụ cho thuê thiết bị công nghệ hiện đại như máy ảnh, drone, loa thông minh và nhiều sản phẩm khác, giúp bạn tiết kiệm chi phí mà vẫn có thể trải nghiệm công nghệ cao.
            </p>
            <p>
              Bee RushTech được sáng lập bởi nhóm sinh viên khoa máy tính trường Đại học Bách Khoa, ĐHQG HCM vào 12/2024. Với sứ mệnh mang đến trải nghiệm tốt nhất về các dịch vụ thuê thiết bị điện tử công nghệ cao với giá cả hợp lí. Chúng tôi luôn nỗ lực đáp ứng mọi yêu cầu của khách hàng.
            </p>
            <p>
              Hãy đến với Bee RushTech - nơi bạn có thể trải nghiệm công nghệ mà không cần phải lo lắng về chi phí! Chúng tôi không chỉ cung cấp thiết bị, mà còn mang đến một trải nghiệm thuê tiện lợi và linh hoạt, giúp bạn dễ dàng tiếp cận công nghệ hiện đại bất cứ lúc nào.
            </p>
            {/* Internal Links */}
            <p>
              Xem thêm <a href="/services">dịch vụ của chúng tôi</a> hoặc <a href="/owner">liên hệ ngay</a> để nhận tư vấn.
            </p>
          </section>
    </div>
      
          
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Company;
