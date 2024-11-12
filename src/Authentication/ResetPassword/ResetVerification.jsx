import React from "react";
import styles from './ResetPassword.module.css'

const resetVerification = () => {
    return(
        <div className={styles.form_container}>
                            <div className={styles.verification}>
                                <div className={styles.verification_title}>Verification</div>
                                <div className={styles.verinormal}>
                                    <div>We have sent you an email with OTP Code</div>
                                    <div>Enter code here <input type="text" name="OTP" /></div>
                                </div>
                            </div>
                        </div>
    );
}
export default resetVerification;
