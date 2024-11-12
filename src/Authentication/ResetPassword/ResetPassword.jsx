import React, { useState } from "react";
import styles from './ResetPassword.module.css';
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import PhoneForm from "./PhoneForm";
import ResetVerification from "./ResetVerification";
import NewPassword from "./NewPassword";
import Congratulations from "./Congratulations";

const ResetPassword = () => {
    const [step, setStep] = useState("phoneForm"); // 'phoneForm', 'verification', 'newPassword', or 'congratulations'
    const [formData, setFormData] = useState({
        phoneOrEmail: "",
        password: "",
        confirmPassword: ""
    });

    const handleNextStep = () => {
        if (step === "phoneForm") setStep("verification");
        else if (step === "verification") setStep("newPassword");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitNewPassword = (e) => {
        e.preventDefault();
        if (formData.password === formData.confirmPassword) {
            // Show Congratulations screen on successful password reset
            setStep("congratulations");
        } else {
            alert("Passwords do not match. Please try again.");
        }
    };

    return (
        <div className={styles.signin}>
            <HeaderLog/>
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
                            <ResetVerification onNext={handleNextStep} />
                        )}
                        {step === "newPassword" && (
                            <NewPassword onChange={handleChange} formData={formData} onSubmit={handleSubmitNewPassword} />
                        )}
                        {step === "congratulations" && (
                            <Congratulations />
                        )}
                    </section>

                    <aside className={styles.sidebar}>
                        <div className={styles.logoContainer}>
                            <img 
                                src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc09774b4dd341bcb6a90cb4b35b19922586f4028b83c62a4e7d616d3addb3e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                                alt="Bee RushTech Logo" 
                                className={styles.logo} 
                            />
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
