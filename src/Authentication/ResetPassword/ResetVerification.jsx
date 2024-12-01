import React from "react";
import styles from "./ResetPassword.module.css";

const ResetVerification = ({ onChange, formData }) => {
    return (
        <div className={styles.form_container}>
            <div className={styles.verification}>
                <div className={styles.verification_title}>Verification</div>
                <div className={styles.verinormal}>
                    <div>Enter the OTP sent to your email:</div>
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={onChange}
                        required
                    />
                    <button onClick={onChange} className={styles.submitButton}>
                        Verify OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetVerification;
