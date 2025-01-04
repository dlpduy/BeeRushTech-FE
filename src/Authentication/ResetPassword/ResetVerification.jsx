import React from "react";
import styles from "./ResetPassword.module.css";

const ResetVerification = ({ onChange, formData }) => {
    return (
        <div className={styles.form_container}>
            <div className={styles.verification}>
                <div className={styles.verification_title}>Xác thực</div>
                <div className={styles.verinormal}>
                    <div>Nhập mã OTP đã gửi đến email của bạn:</div>
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={onChange}
                        required
                    />
                    <button onClick={onChange} className={styles.submitButton}>
                        Xác thực OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetVerification;
