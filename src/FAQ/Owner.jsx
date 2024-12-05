import React from 'react';
import styles from './Owner.module.css';
import { Header } from '../MutualComponents/Header/Header';
import { Footer } from '../MutualComponents/Footer/Footer';
import owner from '../Background/owner.jpg'

const CV = () => {

  return (
    <div >
      <Header />
        <div className={styles.container}>
      <main className={styles.mainContent}>
        <section className={styles.personalInfo}>
          <h1 className={styles.name}>Nguyen Ho Phuoc Hien</h1>
          <p className={styles.jobTitle}>Project Owner</p>
          <p className={styles.contact}>
            <strong>Email: </strong><a href="mailto:hien.nguyenhophuoc@hcmut.edu.vn">hien.nguyenhophuoc@hcmut.edu.vn</a>
          </p>
          <p className={styles.contact}>
            <strong>Phone: </strong> 0869018053
          </p>
          <p className={styles.contact}>
            <strong>Address: </strong>Ly Thuong Kiet, Ward 10, Ho Chi Minh
          </p>
        </section>

        <section className={styles.aboutMe}>
        <img src={owner} alt="Profile" className={styles.image} />
        </section>

        <section className={styles.experience}>
          
        </section>

        <section className={styles.skills}>
          <h2>Kỹ Năng</h2>
          
        </section>

        <section className={styles.education}>
          <h2>Học Vấn</h2>
          <p><strong>Đại học Bách Khoa</strong></p>
        </section>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default CV;
