import {Input} from "@/shared/ui";
import {Controller, useFormContext} from "react-hook-form";
import type {RegistrationForm} from "@/shared/schemas";

type PhoneFieldProps = {
    index: number;
    onRemove: () => void;
    canRemove: boolean;
};

export const PhoneField = ({
                               index,
                               onRemove,
                               canRemove,
                           }: PhoneFieldProps) => {
    // 2 контроллера, 1 поле формы изменять
    const {control} = useFormContext<RegistrationForm>();
    return (
        <div>
            <Controller
                name={`phones.${index}.phone`}
                control={control}
                render={({field, fieldState: {error}}) => (
                    <Input
                        label={`Phone #${index + 1}`}
                        {...field}
                        placeholder="+7 (999) 000-00-00"
                        type="tel"
                        error={error?.message}
                    />
                )}
            />

            <Controller
                name={`phones.${index}.type`}
                control={control}
                render={({field}) => (
                    <select
                        {...field}
                    >
                        <option value="mobile">Mobile</option>
                        <option value="work">Work</option>
                        <option value="home">Home</option>
                    </select>
                )}
            />

            {canRemove && (
                <button type="button" onClick={onRemove}>
                    ✕
                </button>
            )}
        </div>
    );
};