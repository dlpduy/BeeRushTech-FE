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
                <div className={styles.signup_title}>Chúc mừng!</div>
                <div className={styles.normal}>
                    Bạn đã đăng ký thành công !
                    <span onClick={() => navigate("/signin")} className={styles.bold}> Đăng nhập ngay!</span>
                </div>
            </nav>
        </div>
    );
};

export default Congratulation;
