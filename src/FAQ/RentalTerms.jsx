import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const RentalTerms = () => {
  const sidebarItems = [
    'Quy trình Thuê',
    'Thời gian Thuê',
    'Kiểm tra Thiết bị',
    'Trách nhiệm của Người thuê',
    'Phí Thuê và Phí Dịch vụ',
    "Chính sách Hủy thuê"
  ];

  const RentalTermsDetail = [
    'Người dùng cần tạo tài khoản, chọn thiết bị, xác nhận đơn thuê và thanh toán trực tuyến qua các phương thức được hỗ trợ.',
    'Người dùng có thể chọn thuê theo giờ, ngày hoặc tuần, với thời gian thuê tối thiểu là 1 giờ và tối đa là 4 tuần.',
    'Người dùng có quyền kiểm tra thiết bị trước khi nhận và phải ký vào biên bản bàn giao để xác nhận tình trạng thiết bị.',
    'Người thuê phải bảo quản thiết bị cẩn thận và trả đúng hạn trong tình trạng tốt. Nếu thiết bị bị hỏng hoặc mất, người thuê phải chịu trách nhiệm bồi thường.',
    'Giá thuê bao gồm phí cơ bản, phí dịch vụ và có thể bao gồm phí giao hàng. Tất cả chi phí sẽ được hiển thị rõ ràng trước khi xác nhận đơn hàng.',
    'Người thuê có thể hủy đơn hàng miễn phí trong vòng 1 giờ sau khi đặt. Việc hủy sau thời gian này có thể bị tính phí.'
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
          <span className={styles.breadcrumbText}>Điều khoản Thuê</span>
        </nav>
        <h1 className={styles.pageTitle}>Điều khoản Thuê</h1>
        
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
