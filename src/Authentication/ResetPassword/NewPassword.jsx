import React from "react";
import styles from "./ResetPassword.module.css";

const NewPassword = ({ onChange, formData, onSubmit }) => {
    return (
        <form className={styles.form_container} onSubmit={onSubmit}>
            <div className={styles.verification}>
                <div className={styles.verification_title}>Enter New Password</div>
                <div className={styles.form}>
                    <label>New Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                    />
                    <label>Re-enter Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={onChange}
                        required
                    />
                    <button type="submit" className={styles.submitButton}>
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NewPassword;
