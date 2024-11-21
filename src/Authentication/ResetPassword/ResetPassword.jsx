import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Thêm axios để gọi API
import styles from './ResetPassword.module.css';
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import PhoneForm from "./PhoneForm";
import ResetVerification from "./ResetVerification";
import NewPassword from "./NewPassword";
import Congratulations from "./Congratulations";

const ResetPassword = () => {
    const [step, setStep] = useState("phoneForm"); // 'phoneForm', 'verification', 'newPassword', or 'congratulations'
    const [formData, setFormData] = useState({
        email: "", // Lấy email từ PhoneForm
        otp: "", // Lưu mã OTP từ ResetVerification
        password: "",
        confirmPassword: "",
    });

    const handleNextStep = async () => {
        if (step === "phoneForm") {
            try {
                const response = await axios.post("/api/auth/resetpassword", { email: formData.email });
                alert("A reset link has been sent to your email.");
                setStep("verification");
            } catch (error) {
                alert("Error sending reset link. Please try again.");
                console.error(error);
            }
        } else if (step === "verification") {
            setStep("newPassword"); // Cần thêm bước xác thực OTP nếu cần
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            try {
                await axios.put(`/api/auth/resetpassword?token=${formData.otp}`, {
                    newPassword: formData.password,
                    confirmPassword: formData.confirmPassword,
                });
                setStep("congratulations");
            } catch (error) {
                alert("Error resetting password. Please try again.");
                console.error(error);
            }
        } else {
            alert("Passwords do not match. Please try again.");
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className={styles.signin}>
            <HeaderLog />
            <div className={styles.signin_container}>
                <div className={styles.signin_title}>Reset Password</div>
                <div className={styles.normal}>Don't worry! We will get you back!</div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <section className={styles.formInfo}>
                        {step === "phoneForm" && (
                            <PhoneForm onNext={handleNextStep} onChange={handleChange} formData={formData} />
                        )}
                        {step === "verification" && (
                            <ResetVerification onNext={handleNextStep} onChange={handleChange} formData={formData} />
                        )}
                        {step === "newPassword" && (
                            <NewPassword onChange={handleChange} formData={formData} onSubmit={handleSubmitNewPassword} />
                        )}
                        {step === "congratulations" && <Congratulations />}
                    </section>
                    <aside className={styles.sidebar}>
                        <div className={styles.logoContainer}>
                            <Link to="/">
                                <img 
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc09774b4dd341bcb6a90cb4b35b19922586f4028b83c62a4e7d616d3addb3e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                                    alt="Bee RushTech Logo" 
                                    className={styles.logo} 
                                />
                            </Link>
                        </div>
                        {step !== "congratulations" && (
                            <div className={styles.signup_button} onClick={handleNextStep}>
                                <div className={styles.signup_content}>Submit</div>
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
