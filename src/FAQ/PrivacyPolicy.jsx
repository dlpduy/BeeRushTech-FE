import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const PrivacyPolicy = () => {
  const sidebarItems = [
    'Thu thập thông tin cá nhân',
    'Bảo mật dữ liệu',
    'Quyền truy cập và chỉnh sửa',
    'Chính sách cookie',
    'Chia sẻ thông tin',
    "Quyền riêng tư của trẻ em"
  ];

  const policyDetails = [
    'Chỉ định các loại thông tin cá nhân được thu thập (ví dụ: tên, địa chỉ, số điện thoại, thanh toán).',
    'Mô tả cách thông tin người dùng được bảo vệ thông qua mã hóa và các biện pháp bảo mật để ngăn chặn truy cập trái phép.',
    'Người dùng có quyền truy cập và chỉnh sửa thông tin cá nhân của mình.',
    'Giải thích việc sử dụng cookie để nâng cao trải nghiệm người dùng và cho phép người dùng chấp nhận hoặc từ chối cookie.',
    'Xác định các bên thứ ba có thể nhận được thông tin được chia sẻ (ví dụ: đối tác thanh toán) và yêu cầu sự đồng ý của người dùng.',
    'Không có thông tin nào được thu thập từ trẻ em dưới 13 tuổi, tuân thủ các yêu cầu của pháp luật.'
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Header />
        <div className={styles.divider} />
        <nav className={styles.breadcrumb}>
          <div className={styles.breadcrumbItem}>
            <span className={styles.breadcrumbText}>Chính sách và điều khoản</span>
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e0fdb9d40ae6fc7a62a77a5aaf20539d594eebbec2c4dc4822936abf0751ce29?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" alt="" className={styles.breadcrumbIcon} />
          </div>
          <span className={styles.breadcrumbText}>Chính sách</span>
        </nav>
        <h1 className={styles.pageTitle}>Chính sách bảo mật</h1>
        
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
