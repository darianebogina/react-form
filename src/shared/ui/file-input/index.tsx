import {type ChangeEvent, type InputHTMLAttributes, useEffect, useRef, useState, type MouseEvent} from "react";
import styles from "./styles.module.scss";
import {Input} from "@/shared";

type InputProps = {
    selectedFile: File | null;
    onChange: (file: File | null) => void;
    className?: string;
    error?: string
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>;

export const FileInput = ({selectedFile, onChange, className, ...props}: InputProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!selectedFile) {
            setPreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [selectedFile]);

    const onButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onChange?.(file);
    };

    const handleClear = (e: MouseEvent) => {
        e.stopPropagation();
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.fileInput}>
            <Input
                {...props}
                ref={fileInputRef}
                type="file"
                className={styles.hiddenInput}
                onChange={handleFileChange}
            />

            {!selectedFile &&
                <button type="button" onClick={onButtonClick} className={styles.downloadButton}>
                    Click here to load your photo
                </button>
            }
            {selectedFile && preview && (
                <div className={styles.previewWrapper}>
                    <img
                        src={preview}
                        alt="Preview"
                        className={styles.preview}
                    />
                    <button
                        type="button"
                        className={styles.clearButton}
                        onClick={handleClear}
                        title="Delete"
                    >
                        <span>✕</span>
                    </button>
                </div>
            )}
        </div>
    );
};