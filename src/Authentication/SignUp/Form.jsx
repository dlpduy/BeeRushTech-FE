import React from "react";
import styles from './SignUp.module.css';

const Form = ({ onChange, formData }) => {
    return (
        <div className={styles.form}>
            <label> First name  </label>
                <input type="text" name="firstName" value={formData.firstName} onChange={onChange} />
            <label> Last name </label>
                <input type="text" name="lastName" value={formData.lastName} onChange={onChange} />
            <label> Email  </label>
                <input type="email" name="email" value={formData.email} onChange={onChange} />
            <label> Password </label>
                <input type="password" name="password" value={formData.password} onChange={onChange} />
            <label> Re-enter Password </label>
                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={onChange} />
            <label> Phone number </label>
                <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={onChange} />
        </div>
    );
}
export default Form;
