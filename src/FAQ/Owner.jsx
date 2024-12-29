import React from "react";
import styles from "./Owner.module.css";
import { Header } from "../MutualComponents/Header/Header";
import { Footer } from "../MutualComponents/Footer/Footer";
import owner from "../Background/owner.jpg";

const CV = () => {
  return (
    <div>
      <head>
        {/* SEO Meta Tags */}
        <title>Nguyen Ho Phuoc Hien - Project Owner | Bee RushTech</title>
        <meta
          name="description"
          content="Nguyen Ho Phuoc Hien - Project Owner của Bee RushTech. Với kỹ năng quản lý dự án và nền tảng học vấn từ Đại học Bách Khoa, tôi cam kết mang đến giải pháp công nghệ tối ưu."
        />
        <meta
          name="keywords"
          content="Nguyen Ho Phuoc Hien, Project Owner, Bee RushTech, quản lý dự án, Đại học Bách Khoa, công nghệ, hồ sơ cá nhân"
        />
        <meta name="author" content="Nguyen Ho Phuoc Hien" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.beerushtech.com/cv" />
        {/* Schema.org Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Nguyen Ho Phuoc Hien",
            "jobTitle": "Project Owner",
            "worksFor": {
              "@type": "Organization",
              "name": "Bee RushTech",
            },
            "email": "hien.nguyenhophuoc@hcmut.edu.vn",
            "telephone": "+840869018053",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Ly Thuong Kiet, Ward 10",
              "addressLocality": "Ho Chi Minh",
              "addressCountry": "Vietnam",
            },
            "alumniOf": "Đại học Bách Khoa - ĐHQG HCM",
            "image": "https://www.beerushtech.com/images/owner.jpg",
          })}
        </script>
      </head>
      <Header />
      <div className={styles.container}>
        <main className={styles.mainContent}>
          <section className={styles.personalInfo}>
            <h1 className={styles.name}>Nguyen Ho Phuoc Hien</h1>
            <p className={styles.jobTitle}>Project Owner</p>
            <p className={styles.contact}>
              <strong>Email: </strong>
              <a href="mailto:hien.nguyenhophuoc@hcmut.edu.vn">
                hien.nguyenhophuoc@hcmut.edu.vn
              </a>
            </p>
            <p className={styles.contact}>
              <strong>Phone: </strong> 0869018053
            </p>
            <p className={styles.contact}>
              <strong>Address: </strong> Ly Thuong Kiet, Ward 10, Ho Chi Minh
            </p>
          </section>

          <section className={styles.aboutMe}>
            <img src={owner} alt="Profile of Nguyen Ho Phuoc Hien" className={styles.image} />
          </section>

          <section className={styles.experience}>
            <h2>Kinh Nghiệm Làm Việc</h2>
            <ul>
              <li>
                <strong>Project Owner tại Bee RushTech:</strong> Quản lý và điều hành các dự án phát triển dịch vụ công nghệ.
              </li>
              <li>
                <strong>Trợ giảng tại Đại học Bách Khoa:</strong> Hỗ trợ sinh viên trong các khóa học về phát triển phần mềm.
              </li>
            </ul>
          </section>

          <section className={styles.skills}>
            <h2>Kỹ Năng</h2>
            <ul>
              <li>Quản lý dự án</li>
              <li>Giao tiếp và lãnh đạo đội nhóm</li>
              <li>Kỹ năng lập trình: Python, JavaScript, ReactJS</li>
              <li>Phân tích dữ liệu và giải pháp công nghệ</li>
            </ul>
          </section>

          <section className={styles.education}>
            <h2>Học Vấn</h2>
            <p>
              <strong>Đại học Bách Khoa - ĐHQG HCM:</strong> Cử nhân Khoa Máy Tính, tốt nghiệp loại Giỏi.
            </p>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default CV;
