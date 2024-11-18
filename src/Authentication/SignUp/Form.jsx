import React from "react";
import styles from "./SignUp.module.css";

const Form = ({ onChange, formData }) => {
    return (
        <div className={styles.form}>
            <label> First Name </label>
            <input type="text" name="firstName" value={formData.firstName} onChange={onChange} required />
            <label> Last Name </label>
            <input type="text" name="lastName" value={formData.lastName} onChange={onChange} required />
            <label> Email </label>
            <input type="email" name="email" value={formData.email} onChange={onChange} required />
            <label> Password </label>
            <input type="password" name="password" value={formData.password} onChange={onChange} required />
            <label> Re-enter Password </label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} required />
            <label> Phone Number </label>
            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={onChange} required />
        </div>
    );
};

export default Form;
