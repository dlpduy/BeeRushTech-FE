import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const CompensationTerms = () => {
  const sidebarItems = [
    'Thiệt hại hoặc Mất mát',
    'Đánh giá Thiệt hại',
    'Bảo hiểm Thiết bị',
    'Giải quyết Tranh chấp'
  ];

  const CompensationTermsDetail = [
    'Người thuê chịu trách nhiệm bồi thường cho bất kỳ thiệt hại hoặc mất mát nào của thiết bị trong thời gian thuê.',
    'Chi phí bồi thường sẽ dựa trên mức độ thiệt hại thực tế và giá trị của thiết bị.',
    'Người thuê được khuyến khích mua bảo hiểm để bảo vệ thiết bị trong suốt thời gian thuê.',
    'Mọi tranh chấp liên quan đến thiệt hại hoặc bồi thường sẽ tuân theo quy trình giải quyết được định sẵn.'
    
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.divider} />
        <nav className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbText}>FAQ</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0fdb9d40ae6fc7a62a77a5aaf20539d594eebbec2c4dc4822936abf0751ce29?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" alt="" className={styles.breadcrumbIcon} />
          </div>
          <span className={styles.breadcrumbText}>Điều khoản Bồi thường</span>
        </nav>
        <h1 className={styles.pageTitle}>Điều khoản Bồi thường</h1>
        
        <section className={styles.policyContent}>
          <div className={styles.policyLayout}>
            <aside className={styles.sidebar}>
              <nav className={styles.sidebarContent}>
                {sidebarItems.map((item, index) => (
                  <h3 key={index} className={styles.sidebarItem}>{item}</h3>
                ))}
              </nav>
            </aside>
            <main className={styles.mainContent}>
              <div className={styles.policyDetails}>
                {CompensationTermsDetail.map((detail, index) => (
                  <p key={index} className={styles.policySection}>{detail}</p>
                ))}
              </div>
            </main>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

// Export default để sử dụng trong các file khác
export default CompensationTerms;
