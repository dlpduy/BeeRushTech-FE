import React from "react";
import styles from "./ResetPassword.module.css";

const EmailForm = ({ onSendOTP, onChange, formData }) => {
    return (
        <div className={styles.form_container}>
            <div className={styles.form}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                    required
                />
                <button onClick={onSendOTP} className={styles.submitButton}>
                    Send OTP
                </button>
            </div>
        </div>
    );
};

export default EmailForm;
