import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import styles from "./SignUp.module.css";

const Congratulation = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate("/signin"), 5000);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className={styles.signup}>
            <HeaderLog />
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Congratulations</div>
                <div className={styles.normal}>
                    You have successfully registered to our system.
                    <span onClick={() => navigate("/signin")} className={styles.bold}> Sign in now!</span>
                </div>
            </nav>
        </div>
    );
};

export default Congratulation;
