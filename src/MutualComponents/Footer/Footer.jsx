import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const footerLinks = {
  faq: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Rental Terms', path: '/rental-terms' },
    { name: 'Compensation Terms', path: '/compensation-terms' },
    { name: 'Payment Terms', path: '/payment-terms' }
  ],
  resources: [
    { name: 'Free eBooks', path: 'https://drive.google.com/drive/u/1/folders/1z-0b7t2yPKqvUYXzcMa5C_LVTgFD2cde' },  // URL bên ngoài
    { name: 'Development Tutorial', path: 'https://www.geeksforgeeks.org/' }, // URL bên ngoài
    { name: 'Youtube Playlist', path: 'https://www.youtube.com/playlist?list=PLTpNwHSD94us7MH9yy4wvIJME9Un4N65j' }  // URL Youtube
  ]
};

// Mở Facebook trong tab mới
const openFacebook = () => {
  window.open("https://www.facebook.com/profile.php?id=61557019945896", "_blank");
};

export const Footer = () => {
  // Hàm cuộn lên đầu trang
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        {/* Thương hiệu */}
        <div className={styles.brand}>
          <Link to="/" className={styles.brandName}>
            <h3>Bee RushTech</h3>
          </Link>
          <p className={styles.brandDescription}>
            We have clothes that suit your style and which you're proud to wear. From women to men.
          </p>
        </div>

        {/* Các liên kết trong footer */}
        <div className={styles.linksContainer}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <nav key={title} className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>{title.toUpperCase()}</h3>
              <ul className={styles.linkList}>
                {links.map(({ name, path }) => (
                  <li key={name}>
                    {/* Liên kết mở trang web ngoài */}
                    <a 
                      href={path}
                      className={styles.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      onClick={handleScrollToTop} // Cuộn lên đầu trang khi nhấn
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      {/* Footer bottom */}
      <div className={styles.bottom}>
        <p className={styles.copyright}>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className={styles.payments}>
          {/* Liên kết Facebook */}
          <div className={styles.contact}>
            <h3 className={styles.brandName}>Contact for more</h3>
            <button 
              onClick={openFacebook} 
              style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
            >
              <img 
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/364f0e70e453f1d0023941140efca74429354b716f66553789b48a6cea7c4d49?placeholderIfAbsent=true&apiKey=0a3e8fdc78024414a2749a36ad80ee2c"
                alt="Logo"
                style={{ height: '20px' }} 
              />
            </button>
          </div>
          <p>Email: hien.nguyenhophuoc@hcmut.edu.vn</p>
          <p>Phone: 0869018053</p>
        </div>
      </div>
    </footer>
  );
};
