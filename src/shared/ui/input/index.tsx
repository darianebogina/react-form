import type {InputHTMLAttributes, Ref} from "react";
import styles from './styles.module.scss';

type InputProps = {
    label?: string;
    error?: string;
    ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input = ({label, error, ref, ...props}: InputProps) => {
    return (
        <div className={styles.input}>
            {label && (
                <label className={styles.label}>
                    {label}
                </label>
            )}
            <input {...props} ref={ref}/>
            {error && (
                <span className={styles.error} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}