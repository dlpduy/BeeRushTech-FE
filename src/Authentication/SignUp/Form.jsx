import React from "react";
import styles from "./SignUp.module.css";

const Form = ({ onChange, formData }) => {
    return (
        <div className={styles.form}>
            <label>Họ</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={onChange}
                required
            />
            <label>Tên</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={onChange}
                required
            />
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={onChange}
                required
            />
            <label>Mật khẩu</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={onChange}
                required
            />
            <label>Nhập lại mật khẩu</label>
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={onChange}
                required
            />
            <label>Số điện thoại</label>
            <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={onChange}
                required
            />
        </div>
    );
};

export default Form;
