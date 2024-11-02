import React from 'react';
import styles from './PrivacyPolicy.module.css';
import { Header } from '../../MutualComponents/Header/Header';
import { Footer } from '../../MutualComponents/Footer/Footer';

const PrivacyPolicy = () => {
  const sidebarItems = [
    'Personal Information Collection',
    'Data Security',
    'Access and Edit Rights',
    'Cookie Policy',
    'Information Sharing',
    "Children's Privacy"
  ];

  const policyDetails = [
    'Specify the types of personal information collected (e.g., name, address, phone number, payment).',
    'Describe how user information is protected through encryption and security measures to prevent unauthorized access.',
    'Users have the right to access and edit their personal information.',
    'Explain the use of cookies to enhance the user experience and allow users to accept or decline cookies.',
    'Identify third parties that may receive shared information (e.g., payment partners) and require user consent.',
    'No information will be collected from children under 13 years old, in compliance with legal requirements.'
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
          <span className={styles.breadcrumbText}>Privacy</span>
        </nav>
        <h1 className={styles.pageTitle}>Privacy Policy</h1>
        
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
                {policyDetails.map((detail, index) => (
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
export default PrivacyPolicy;
