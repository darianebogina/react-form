import {Input} from "@/shared/ui";
import {
    Controller, type FieldErrors, FormProvider, useFieldArray,
    useForm, useWatch,
} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {type RegistrationForm, RegistrationSchema} from "@/shared/schemas";
import {FileInput} from "@/shared/ui/file-input";
import {PhoneField} from "@/shared/ui/phone-input";
import {NotificationSettings} from "@/shared/ui/notification";
import styles from './styles.module.scss';

// добавить например isValid +

export const Form = () => {

    const form = useForm<RegistrationForm>({
        resolver: zodResolver(RegistrationSchema),
        mode: "onChange",
        defaultValues: {
            type: "Person",
            name: "",
            surname: "",
            email: "",
            birthday: new Date(),
            password: "",
            refinePassword: "",
            companyName: "",
            tin: "",
            position: "",
            phones: [],
            notifications: {
                email: false,
                push: true,
                sms: false,
            },
        } as RegistrationForm,
    });
    const {control, register, handleSubmit, formState: {errors, isValid}} = form;

    const {fields, append, remove} = useFieldArray({
        control,
        name: "phones",
    });

    const onSubmit = (data: any) => {
        console.log(data);
    };

    const registrationType = useWatch({
        control,
        name: "type",
    }) as RegistrationForm["type"];

    const isCompany = registrationType === "Company";
    const e = errors as FieldErrors<Extract<RegistrationForm, { type: "Company" }>>;

    return (
        <FormProvider {...form}>
            {/*чекбокс тут и тогда будет условная валидация*/}
            {/*посмотреть useController*/}
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className={styles.companyToggle}>
                        <input
                            type="checkbox"
                            checked={isCompany}
                            onChange={(e) => form.setValue("type", e.target.checked ? "Company" : "Person", {
                                shouldValidate: true,
                                shouldTouch: true,
                            })}
                            className={styles.checkbox}
                        />
                        <span className={styles.checkboxText}>
                        Registration from your company
                    </span>
                    </label>


                    <Controller
                        name="file"
                        control={control}
                        render={({field: {onChange, value, ...field}, fieldState: {error}}) => (
                            <FileInput
                                selectedFile={value}
                                onChange={onChange}
                                {...field}
                                accept="image/*"
                                className={styles.photoInput}
                                error={error?.message}
                            />
                        )}
                    />
                    <fieldset className={styles.fieldset}>
                        <legend>Personal data</legend>
                        <Input
                            label="Name"
                            {...register('name')}
                            placeholder="Joe"
                            error={errors.name?.message as string}
                        />
                        <Input
                            label="Surname"
                            {...register('surname')}
                            placeholder="Black"
                            error={errors.surname?.message as string}
                        />
                        <Input
                            label="email"
                            {...register('email')}
                            placeholder="qwerty@google.com"
                            type="email"
                            error={errors.email?.message as string}
                        />
                        <Input
                            label="Birthday"
                            {...register('birthday')}
                            type="date"
                            error={errors.birthday?.message as string}
                        />
                        <Input
                            label="Password"
                            {...register('password')}
                            placeholder="QwertY123"
                            type="password"
                            error={errors.password?.message as string}
                        />
                        <Input
                            label="Refine password"
                            {...register('refinePassword')}
                            placeholder="QwertY123"
                            type="password"
                            error={errors.refinePassword?.message as string}
                        />
                    </fieldset>
                    {isCompany && (
                        <fieldset className={styles.fieldset}>
                            <legend>Company data</legend>
                            <Input
                                label="Company name"
                                {...register("companyName")}
                                placeholder="Company name"
                                error={e.companyName?.message as string}
                            />
                            <Input
                                label="TIN"
                                {...register("tin")}
                                placeholder="TIN"
                                error={e.tin?.message as string}
                            />
                            <Input
                                label="Position"
                                {...register("position")}
                                placeholder="Position"
                                error={e.position?.message as string}
                            />
                        </fieldset>
                    )}
                    <fieldset>
                        <legend>Phone numbers</legend>

                        {fields.map((_, index) => (
                            // некорректно поправить на 2 контроллера(внутри) +
                            <PhoneField
                                index={index}
                                onRemove={() => remove(index)}
                                canRemove={true}
                            />
                        ))}

                        <button type="button" onClick={() => append({phone: "", type: "mobile"})}>
                            + Add phone
                        </button>
                    </fieldset>

                    <NotificationSettings/>
                    <button
                        type="submit"
                        disabled={!isValid}
                    >
                        Send
                    </button>
                </form>
            </div>
        </FormProvider>
    )
};