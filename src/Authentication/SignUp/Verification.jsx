import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import styles from "./SignUp.module.css";

const Verification = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        const sendOTP = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/resetpassword`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: userEmail }),
                });

                if (!response.ok) {
                    alert("Failed to send OTP. Please try again.");
                }
            } catch (error) {
                console.error("Error sending OTP:", error);
            }
        };

        sendOTP();
    }, [userEmail]);

    const handleVerificationSubmit = async () => {
        const otp = document.querySelector('input[name="OTP"]').value;

        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/resetpassword`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: otp }),
            });

            if (response.ok) {
                alert("Verification successful!");
                navigate("/congratulation");
            } else {
                const data = await response.json();
                alert(data.message || "Verification failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during verification:", error);
            alert("An error occurred during verification.");
        }
    };

    return (
        <div className={styles.signup}>
            <HeaderLog />
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Verification</div>
                <div className={styles.verinormal}>
                    <div>We have sent you an email with an OTP code.</div>
                    <div>
                        Enter code here <input type="text" name="OTP" />
                    </div>
                </div>
            </nav>
            <div className={styles.container}>
                <div className={styles.signup_button} onClick={handleVerificationSubmit}>
                    <div className={styles.signup_content}>Submit</div>
                </div>
            </div>
        </div>
    );
};

export default Verification;
