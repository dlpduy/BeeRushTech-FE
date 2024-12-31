import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import api from "../../api";

const NewPassword = ({ onChange, formData, setStep }) => {
    const [loading, setLoading] = useState(false);
    const handleSubmitNewPassword = async (e) => {
        console.log(formData);
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            setLoading(true);
            const response = await api.put("/auth/reset-password?token=" + formData.otp, {
                newPassword: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (response.statusCode === 200) {
                setStep("congratulations"); // Hiển thị thông báo thành công
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred while resetting the password.");
        }
        setLoading(false);
    };
    return (
        <form className={styles.form_container}>
            <div className={styles.verification}>
                <div className={styles.verification_title}>Enter New Password</div>
                <div className={styles.form}>
                    <label>OTP</label>
                    <input
                        type="text"
                        name="otp"
                        value={formData.otp}
                        onChange={onChange}
                        required
                    />
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
                    <button type="button" disabled={loading} onClick={handleSubmitNewPassword} className={styles.submitButton}>
                        Reset Password
                    </button>
                </div>
            </div>
        </form>
    );
};

export default NewPassword;
