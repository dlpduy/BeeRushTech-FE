import React from "react";
import styles from "./ResetPassword.module.css";

const EmailForm = ({ onChange, formData }) => {
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
            </div>
        </div>
    );
};

export default EmailForm;
