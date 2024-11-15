import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const RentalTerms = () => {
  const sidebarItems = [
    'Rental Process',
    'Rental Period',
    'Device Inspection',
    'Renter’s Responsibility',
    'Rental Fees and Service Charges',
    "Cancellation Policy"
  ];

  const RentalTermsDetail = [
    'Users need to create an account, select a device, confirm the rental order, and make an online payment through supported methods.',
    'Users can choose to rent by the hour, day, or week, with a minimum rental period of 1 hour and a maximum of 4 weeks.',
    'Users have the right to inspect the device before receiving it and must sign a handover form to confirm its condition.',
    'The renter must take care of the device and return it on time in good condition. If the device is damaged or lost, the renter is responsible for compensation.',
    'The rental price includes base fees, service charges, and possible delivery fees. All costs will be clearly displayed before order confirmation.',
    'Renters can cancel the order for free within 1 hour after placing it. Cancellations after this time may incur a fee.'
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
          <span className={styles.breadcrumbText}>Rental Terms</span>
        </nav>
        <h1 className={styles.pageTitle}>Rental Terms</h1>
        
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
                {RentalTermsDetail.map((detail, index) => (
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
export default RentalTerms;
