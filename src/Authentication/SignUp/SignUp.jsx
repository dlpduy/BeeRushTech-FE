import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import Form from "./Form";
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
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber,
                }),
            });

            if (response.ok) {
                alert("Registration successful! Check your email for verification.");
                localStorage.setItem("userEmail", email); // Lưu email để dùng trong verification
                navigate("/verification");
            } else {
                const data = await response.json();
                alert(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert("An error occurred while registering.");
        }
    };

    return (
        <div className={styles.signup}>
            <HeaderLog />
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Sign Up</div>
                <div className={styles.normal}>
                    Ready to become a <div className={styles.bold}>Bee Rushter?</div>
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
                            <div className={styles.signup_content}>Sign Up</div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
