import React from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import styles from "./SignUp.module.css";

const Congratulation = () => {
    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate("/signin"); // Điều hướng đến giao diện SignIn khi nhấn Sign In
    };

    return (
        <div className={styles.signup}>
            <HeaderLog/>
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Congratulations</div>
                <div className={styles.normal}>
                    You have successfully registered to our system. 
                    <span onClick={handleSignIn} className={styles.bold}> Sign in now!</span>
                </div>
            </nav>
        </div>
    );
}

export default Congratulation;
