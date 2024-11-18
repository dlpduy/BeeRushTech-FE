import React from 'react';
import styles from './Footer.module.css';
import { Link } from 'react-router-dom';

const footerLinks = {
  company: [
    { name: 'About' },
    { name: 'Features' },
    { name: 'Works' },
    { name: 'Career' }
  ],
  help: [
    { name: 'Customer Support', path: '/customer-support' },
    { name: 'Delivery Details', path: '/delivery-details' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy-policy' }
  ],
  faq: [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Rental Terms', path: '/rental-terms' },
    { name: 'Compensation Terms', path: '/compensation-terms' },
    { name: 'Payment Terms', path: '/payment-terms' }
  ],
  resources: [
    { name: 'Free eBooks', path: '/free-ebooks' },
    { name: 'Development Tutorial', path: '/development-tutorial' },
    { name: 'How to - Blog', path: '/how-to-blog' },
    { name: 'Youtube Playlist', path: '/youtube-playlist' }
  ]
};

const paymentMethods = [
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/07b579bdf16d79432ceb4492b7c9eab8bf0e23ba0cb53bef1a92e3dc335fbe77?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Visa'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/f647c4c6f1e9113d1a89f0b9e2a1d9c6dd9169ad1e2991a0ff1efca51497b837?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'MasterCard'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/975a9846a987addae6fd2fc834a93542b096f7bd7b1c050b3f5b65e77ce75d15?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'PayPal'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/23f47b282720e699ac6dd8b954fcd817f414ad5602287b673bc5d61e7b210ae6?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Apple Pay'
  },
  {
    src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/8392bceddda7d3a1813b9209d1db738a4eda28b381755cc11ed098949747454d?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8',
    alt: 'Google Pay'
  }
];

export const Footer = () => {
  const handleScrollToTop = (e) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link to="/" className={styles.brandName}>
            <h3>Bee RushTech</h3>
          </Link>
          <p className={styles.brandDescription}>
            We have clothes that suit your style and which you're proud to wear. From women to men.
          </p>
        </div>

        <div className={styles.linksContainer}>
          {Object.entries(footerLinks).map(([title, links]) => (
            <nav key={title} className={styles.linkGroup}>
              <h3 className={styles.linkTitle}>{title.toUpperCase()}</h3>
              <ul className={styles.linkList}>
                {links.map(({ name, path }) => (
                  <li key={name}>
                    <Link
                      to={path}
                      className={styles.link}
                      aria-label={name}
                      onClick={handleScrollToTop} // Gọi hàm cuộn lên đầu
                    >
                      {name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.bottom}>
        <p className={styles.copyright}>Shop.co © 2000-2023, All Rights Reserved</p>
        <div className={styles.payments}>
          {paymentMethods.map((method, index) => (
            <img
              key={index}
              src={method.src}
              alt={method.alt}
              className={styles.paymentIcon}
            />
          ))}
        </div>
      </div>
    </footer>
  );
};
