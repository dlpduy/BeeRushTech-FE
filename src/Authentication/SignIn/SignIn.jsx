import React from "react";
import { HeaderLog } from "../../LoginComponent/HeaderLog";
import styles from './SignIn.module.css'


const SignIn = () => {
    return (
        <div className={styles.signin}>
            <HeaderLog/>
            <nav className={styles.signin_container}>
                <div className={styles.signin_title}>Sign In</div>
                <div className={styles.normal}>Welcome back!</div>
            </nav>

            <div className={styles.container}>
                <div className={styles.content}>
                <section className={styles.formInfo}>
                    <div className={styles.form_container}>
                        <div className={styles.form}>
                            <label>Email/ Phone</label>
                                <input type="phone" name ="email"/>
                            <label>Password</label>
                                <input type="password" name="password"/>

                        </div>
                    </div>
                </section>

                <aside className={styles.sidebar}>
                    <div className={styles.logoContainer}>
                    <img 
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bcc09774b4dd341bcb6a90cb4b35b19922586f4028b83c62a4e7d616d3addb3e?placeholderIfAbsent=true&apiKey=aa0c3b8d094f45b48d52977318229ea8" 
                        alt="Bee RushTech Logo" 
                        className={styles.logo} 
                        />
                    </div>
                    
                    <div className={styles.signup_button}>
                        <div className={styles.signup_content}> Sign In</div>
                    </div>
                    
                </aside>
                </div>
            </div>
        </div>
    );
}

export default SignIn;