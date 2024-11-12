import React from "react";
import styles from './ResetPassword.module.css'

const PhoneForm = () => {
    return (
        <div className={styles.form_container}>
        <div className={styles.form}>
            <label>Email/ Phone</label>
                <input type="phone" name ="email"/>
        </div>
    </div>
    )
}

export default PhoneForm;