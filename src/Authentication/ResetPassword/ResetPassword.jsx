import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api"; // Sử dụng API instance đã cấu hình
import styles from "./ResetPassword.module.css";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import EmailForm from "./EmailForm";
import ResetVerification from "./ResetVerification";
import NewPassword from "./NewPassword";
import Congratulations from "./Congratulations";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    const [step, setStep] = useState("emailForm");  // Trạng thái bước hiện tại
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    // Hàm để xử lý khi người dùng chuyển sang bước tiếp theo
    const handleNextStep = async () => {
        try {
            if (step === "emailForm") {
                const response = await api.post("/auth/reset-password?email=" + formData.email);
                console.log(response);
                if (response.statusCode === 200) {
                    alert("A reset link has been sent to your email.");
                    setStep("newPassword"); // Chuyển sang bước nhập mã OTP
                }
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    // Hàm để cập nhật giá trị các trường trong form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className={styles.signin}>
            <HeaderLog />
            <div className={styles.signin_container}>
                <div className={styles.signin_title}>Thay đổi mật khẩu</div>
                <div className={styles.normal}>Đừng lo lắng! Chúng tôi sẽ giúp bạn!</div>
            </div>

            <div className={styles.container}>
                <div className={styles.content}>
                    <section className={styles.formInfo}>
                        {step === "emailForm" && <EmailForm onChange={handleChange} formData={formData} setStep={setStep} />}
                        {step === "newPassword" && <NewPassword onChange={handleChange} formData={formData} setStep={setStep} />}
                        {step === "congratulations" && <Congratulations />}
                    </section>
                    <aside className={styles.sidebar}>
                        <div className={styles.logoContainer}>
                            <Link to="/">
                                <img
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc09774b4dd341bcb6a90cb4b35b19922586f4028b83c62a4e7d616d3addb3e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8"
                                    alt="Logo"
                                />
                            </Link>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
