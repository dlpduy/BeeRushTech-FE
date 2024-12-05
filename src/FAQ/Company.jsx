import React from 'react';
import styles from './FAQ.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';

const Company = () => {
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
        <div className={styles.bee_rushtech_intro}>
      <header>
        <h1>Bee RushTech – Easy Technology 4U!!!</h1>
        <h2>Bee RushTech – Everything You Need, Delivered with Speed!!!</h2>
      </header>
      <section className={styles.intro_text
      }>
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
      </section>
    </div>
      <Footer />
      </div>
    </div>
  );
};


export default Company;
