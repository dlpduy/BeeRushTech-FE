import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const PaymentTerms = () => {
  const sidebarItems = [
    'Phương thức Thanh toán',
    'Quy trình Thanh toán',
    'Hoàn tiền',
    'Tiền Đặt cọc',
    'Phí Trả chậm'

  ];

  const PaymentTermsDetail = [
    'Chúng tôi chấp nhận thẻ tín dụng, thẻ ghi nợ, chuyển khoản ngân hàng và ví điện tử.',
    'Người dùng phải hoàn tất thanh toán trực tuyến trước khi nhận thiết bị. Quy trình này được bảo mật và mã hóa để bảo vệ thông tin người dùng.',
    'Việc hoàn tiền sẽ được áp dụng trong trường hợp hủy đơn hàng hoặc thiết bị gặp vấn đề, theo chính sách hoàn tiền.',
    'Một khoản tiền đặt cọc có thể được yêu cầu để bảo vệ trước các thiệt hại hoặc mất mát của thiết bị.',
    'Các khoản phạt có thể được áp dụng đối với việc thanh toán trễ hoặc vi phạm hợp đồng.'
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
          <span className={styles.breadcrumbText}>Điều khoản thanh toán</span>
        </nav>
        <h1 className={styles.pageTitle}>Điều khoản thanh toán</h1>
        
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
