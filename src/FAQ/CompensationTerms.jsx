import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const CompensationTerms = () => {
  const sidebarItems = [
    'Damage or Loss',
    'Damage Assessment',
    'Device Insurance',
    'Dispute Resolution'
  ];

  const CompensationTermsDetail = [
    'Renters are responsible for compensating any damage or loss of the device during the rental period.',
    'The cost of compensation will be based on the actual damage and device value.',
    'Renters are encouraged to purchase insurance to protect the device throughout the rental period.',
    'Any disputes related to damage or compensation will follow a defined resolution process.'
    
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
          <span className={styles.breadcrumbText}>Compensation Terms</span>
        </nav>
        <h1 className={styles.pageTitle}>Compensation Terms</h1>
        
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
