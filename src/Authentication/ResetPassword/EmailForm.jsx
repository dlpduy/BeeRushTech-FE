import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import api from "../../api"; // Sử dụng API instance đã cấu hình
const EmailForm = ({ onChange, formData, setStep }) => {

    const [loading, setLoading] = useState(false);
    const onSendOTP = async () => {
        try {
            setLoading(true);
            const response = await api.post("/auth/reset-password?email=" + formData.email);
            console.log(response);
            if (response.statusCode === 200) {
                alert("A reset link has been sent to your email.");
                setStep("newPassword"); // Chuyển sang bước nhập mã OTP
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
        setLoading(false);
    }


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
                <button onClick={onSendOTP} className={styles.submitButton} disabled={loading}>
                    Gửi mã OTP
                </button>
            </div>
        </div>
    );
};

export default EmailForm;
