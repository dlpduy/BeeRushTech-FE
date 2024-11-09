import React from "react";
import {HeaderLog} from '../../LoginComponent/HeaderLog';
import styles from "./SignUp.module.css"

const Congratulation = () => {

    return (
        <div className={styles.signup}>
            <HeaderLog/>
            <nav className={styles.signup_container}>
                <div className={styles.signup_title}>Congratulation</div>
                <div className={styles.normal}>You have successfully registered to our system.  <div className={styles.bold}> Sign in now!</div></div>
            </nav>


        </div>
    );
}

export default Congratulation;