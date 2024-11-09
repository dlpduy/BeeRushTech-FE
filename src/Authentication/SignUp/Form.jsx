import React from "react";
import styles from './SignUp.module.css'


const Form = () => {
    return (
        <div className={styles.form}>
            <label> First name  </label>
                <input type="text" name ="firstname" />

            <label> Last name </label>
                <input type="text" name ="lastname" />
            
            <label> Email  </label>
                <input type="email" name ="email" />
            
            <label> Password </label>
                <input type="password" name ="password" />
            
            <label> Re-enter Password </label>
                <input type="password" name ="confirmPassword" />
            
            <label> Phone number </label>
                <input type="tel" name ="phoneNumber" />
            

        </div>
    );
}
export default Form;