import {Form} from "./form";
import styles from './styles.module.scss';

export const FormPage = () => {
    return (
        <>
            <h1 className={styles.header}>Registration form</h1>
            <Form />
            {/*<label>*/}
            {/*    <input*/}
            {/*        type="checkbox"*/}
            {/*        checked={isCompany}*/}
            {/*        onChange={(e) => setIsCompany(e.target.checked)}*/}
            {/*        className={styles.checkbox}*/}
            {/*    />*/}
            {/*    <span className={styles.checkboxText}>Registration from your company</span>*/}
            {/*</label>*/}

            {/*<Form isCompany={isCompany}/>*/}
        </>
    );
};