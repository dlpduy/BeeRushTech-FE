import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import { GoogleLogin } from "@react-oauth/google";
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
               username: formData.email,
                password: formData.password,
            });

            const { accessToken, user } = response.data;
            const {role, email} = user;
            


            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("role", role);
            localStorage.setItem("email", email);

            alert("Login successful!");

            if (role === "ADMIN") {
                navigate("/admin");
            } else if (role === "CUSTOMER") {
                navigate("/user");
            } else {
                navigate("/");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    const handleGoogleLogin = async (googleResponse) => {
    try {
        const idToken = googleResponse.credential; // Lấy token từ Google response
        const apiResponse = await api.post("/auth/login-with-google", { token: idToken });

        const { accessToken, role } = apiResponse.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("role", role);

        alert("Google login successful!");
        navigate("/user");
    } catch (err) {
        console.error(err);
        setError("Google login failed. Please try again.");
    }
};


    return (

            <div className={styles.signin}>
                <HeaderLog />
                <nav className={styles.signin_container}>
                    <div className={styles.signin_title}>Đăng nhập</div>
                    <div className={styles.normal}>Chào mừng trở lại!</div>
                </nav>

                <div className={styles.container}>
                    <div className={styles.content}>
                        <section className={styles.formInfo}>
                            <div className={styles.form_container}>
                                <div className={styles.form}>
                                    <label>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Enter your email or phone"
                                        required
                                    />
                                    <label>Mật khẩu</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <div className={styles.forget}>
                                        <button onClick={handleForgotPassword}>Quên mật khẩu?</button>
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
                                <div className={styles.signup_content}>Đăng nhập</div>
                            </div>
                            <div className={styles.googleLogin}>
                                <GoogleLogin
                                    onSuccess={handleGoogleLogin}
                                    onError={() => console.log("Google Login Failed")}
                                />
                            </div>
                            {error && <p className={styles.error}>{error}</p>}
                        </aside>
                    </div>
                </div>
            </div>
    );
};

export default SignIn;
