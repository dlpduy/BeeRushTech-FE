import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import api from "../../api"; // Import API instance
import styles from "./SignIn.module.css";

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(null);

    const handleForgotPassword = () => {
        navigate("/resetpassword");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignIn = async () => {
        if (!formData.email || !formData.password) {
            setError("Please enter both email and password.");
            return;
        }

        try {
            const response = await api.post("/auth/login", {
                username: formData.email, // Backend yêu cầu trường 'username'
                password: formData.password,
            });

            const { accessToken } = response.data.data; // Trích xuất token từ API response

            // Lưu token vào localStorage
            localStorage.setItem("accessToken", accessToken);

            alert("Login successful!");
            navigate("/"); // Chuyển hướng đến trang chủ hoặc dashboard
        } catch (err) {
            // Xử lý lỗi và hiển thị thông báo
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    return (
        <div className={styles.signin}>
            <HeaderLog />
            <nav className={styles.signin_container}>
                <div className={styles.signin_title}>Sign In</div>
                <div className={styles.normal}>Welcome back!</div>
            </nav>

            <div className={styles.container}>
                <div className={styles.content}>
                    <section className={styles.formInfo}>
                        <div className={styles.form_container}>
                            <div className={styles.form}>
                                <label>Email/Phone</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email or phone"
                                    required
                                />
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Enter your password"
                                    required
                                />
                                <div className={styles.forget}>
                                    <button onClick={handleForgotPassword}>Forgot Password?</button>
                                </div>
                            </div>
                        </div>
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
                        <div className={styles.signup_button} onClick={handleSignIn}>
                            <div className={styles.signup_content}>Sign In</div>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
