import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import api from "../../api"; // Import the configured API instance
import styles from "./SignUp.module.css";

const Verification = () => {
    const navigate = useNavigate();
    const userEmail = localStorage.getItem("userEmail");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const handleVerificationSubmit = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }

        setLoading(true);

        try {
            await api.post("/auth/verify-otp", {
                token: otp,
                email: userEmail,
            });

            alert("Verification successful!");
            navigate("/congratulation");
        } catch (error) {
            alert(error.response?.data?.message || "Verification failed. Please try again.");
            console.error("Error during verification:", error);
        } finally {
            setLoading(false);
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
                        Enter code here <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </div>
                </div>
            </nav>
            <div className={styles.container}>
                <button className={styles.signup_button} onClick={handleVerificationSubmit} disabled={loading}>
                    {loading ? "Verifying..." : "Submit"}
                </button>
            </div>
        </div>
    );
};

export default Verification;
