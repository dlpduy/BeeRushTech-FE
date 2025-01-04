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
                <div className={styles.signup_title}>Chúc mừng!</div>
                <div className={styles.normal}>
                    Bạn đã thay đổi mật khẩu thành công!
                    <span onClick={handleSignIn} className={styles.bold}> Đăng nhập ngay!</span>
                </div>
            </nav>
        </div>
    );
};

export default Congratulations;
