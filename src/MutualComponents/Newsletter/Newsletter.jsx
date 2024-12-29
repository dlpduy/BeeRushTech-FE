import React from 'react';
import styles from './NewsletterSection.module.css';

export default function NewsletterSection() {
  // Hàm xử lý submit để ngăn tải lại trang
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className={styles.newsletterContainer}>
      <h2 className={styles.heading}>
      CẬP NHẬT TIN TỨC MỚI NHẤT TỪ CHÚNG TÔI
      </h2>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div className={styles.inputWrapper}>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e2f03936191f3af3d684591454051985eb354413c6b0268ef063c0cdcd4d89b8?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
            className={styles.emailIcon} 
            alt=""
          />
          <label htmlFor="emailInput" className={styles['visually-hidden']}>
            Nhập email của bạn
          </label>
          <input
            type="email"
            id="emailInput"
            placeholder="Nhập email của bạn"
            className={styles.input}
            aria-label="Nhập email của bạn"
            required
          />
        </div>
        <button 
          type="submit" 
          className={styles.subscribeButton}
        >
          Đăng ký nhận tin
        </button>
      </form>
    </section>
  );
}
