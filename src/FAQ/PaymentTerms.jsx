import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const PaymentTerms = () => {
  const sidebarItems = [
    'Payment Methods',
    'Payment Process',
    'Refunds',
    'Security Deposit',
    'Late Payment Fees'

  ];

  const PaymentTermsDetail = [
    'We accept credit cards, debit cards, bank transfers, and e-wallets.',
    'Users must complete the payment online before receiving the device. The process is secure and encrypted to protect user information.',
    'Refunds are available in case of order cancellations or device issues, according to the refund policy.',
    'A security deposit may be required to protect against damage or loss of the device.',
    'Penalties may apply for late payments or contract violations.'
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
          <span className={styles.breadcrumbText}>Payment Terms</span>
        </nav>
        <h1 className={styles.pageTitle}>Payment Terms</h1>
        
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
                {PaymentTermsDetail.map((detail, index) => (
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
export default PaymentTerms;
