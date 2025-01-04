import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import Form from "./Form";
import api from "../../api"; // Import the configured API instance
import styles from "./SignUp.module.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignUp = async () => {
        const { firstName, lastName, email, password, confirmPassword, phoneNumber } = formData;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !phoneNumber) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            const response = await api.post("/auth/register", {
                fullName: `${firstName} ${lastName}`,
                email,
                password,
                address: "Default Address", // Placeholder address for now
                phoneNumber,
            });

            alert("Registration successful! ");
            localStorage.setItem("userEmail", email);
            navigate("/congratulation");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Please try again.");
            console.error("Error during registration:", error);
        }
    };

    return (
        <div className={styles.signup}>
            <HeaderLog />
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Đăng ký</div>
                <div className={styles.normal}>
                    Bạn đã chuẩn bị để trở thành một <div className={styles.bold}>Bee Rushter?</div>
                </div>
            </nav>
            <div className={styles.container}>
                <div className={styles.content}>
                    <section className={styles.formInfo}>
                        <div className={styles.form_container}>
                            <Form onChange={handleInputChange} formData={formData} />
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
                        <div className={styles.signup_button} onClick={handleSignUp}>
                            <div className={styles.signup_content}>Đăng ký</div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
