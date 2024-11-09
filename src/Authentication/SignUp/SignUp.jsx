import React from "react";
import {HeaderLog} from '../../LoginComponent/HeaderLog';
import Form from './Form'
import styles from "./SignUp.module.css"


const SignUp = () => {
    return (
        <div className={styles.signup}>
            <HeaderLog/>
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Sign Up</div>
                <div className={styles.normal}>Ready to become a <div className={styles.bold}> Bee Rushter?</div></div>
            </nav>
            
            <div className={styles.container}>
            <div className={styles.content}>
                <section className={styles.formInfo}>
                <div className={styles.form_container}>
                    <Form/>
                    
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
                        <div className={styles.signup_content}> Sign Up</div>
                    </div>
                    
                </aside>
            </div>
            </div>
        </div>
    );
}

export default SignUp;