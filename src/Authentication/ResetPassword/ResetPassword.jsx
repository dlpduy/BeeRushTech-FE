import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api"; // Sử dụng API instance đã cấu hình
import styles from "./ResetPassword.module.css";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import EmailForm from "./EmailForm";
import ResetVerification from "./ResetVerification";
import NewPassword from "./NewPassword";
import Congratulations from "./Congratulations";

const ResetPassword = () => {
    const [step, setStep] = useState("emailForm");
    const [formData, setFormData] = useState({
        email: "",
        otp: "",
        password: "",
        confirmPassword: "",
    });

    const handleNextStep = async () => {
        try {
            if (step === "emailForm") {
                const response = await axios.post("/auth/resetpassword", { email: formData.email });
                alert("A reset link has been sent to your email.");
                setStep("verification");
            } else if (step === "verification") {
                const response = await axios.post("/auth/verify-otp", { token: formData.otp });
                alert("OTP verified successfully.");
                setStep("newPassword");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const handleSubmitNewPassword = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        try {
            await axios.put("/auth/resetpassword", {
                password: formData.password,
                token: formData.otp,
            });
            setStep("congratulations");
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred while resetting the password.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                        {step === "emailForm" && <EmailForm onChange={handleChange} formData={formData} />}
                        {step === "verification" && <ResetVerification onChange={handleChange} formData={formData} />}
                        {step === "newPassword" && <NewPassword onChange={handleChange} formData={formData} onSubmit={handleSubmitNewPassword} />}
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
