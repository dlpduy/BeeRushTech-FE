import React from "react";
import styles from "../SignUp/SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";

const Congratulations = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/signin"); // Điều hướng đến giao diện SignIn khi nhấn Sign In
    };

    return (
        <div className={styles.signup}>
            <HeaderLog />
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Congratulations</div>
                <div className={styles.normal}>
                    You have successfully changed your password.
                    <span onClick={handleSignIn} className={styles.bold}> Sign in now!</span>
                </div>
            </nav>
        </div>
    );
};

export default Congratulations;
