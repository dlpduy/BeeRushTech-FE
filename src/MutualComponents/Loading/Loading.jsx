import React from "react";
import styles from "./Loading.module.css";

const Loading = ({ logo }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.logo}>
        <img
          src={logo || "logo.png"} // Sử dụng ảnh truyền vào, nếu không có dùng ảnh mặc định
          alt="Loading logo"
          className={styles.logoImage} // Áp dụng class cho ảnh
        />
      </div>
      <h3>Loading...</h3>
    </div>
  );
};

export default Loading;
