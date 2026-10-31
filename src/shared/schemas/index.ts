import {z} from "zod";
import {PhoneSchema} from "@/shared/ui/phone-input/lib";
import {NotificationSettingsSchema} from "@/shared/ui/notification/lib";

const commonSchema = {
    name: z.string().min(2, "The minimum name length is 2 characters."),
    surname: z.string().min(2, "The minimum name length is 2 characters."),
    email: z.email("Invalid email address"),
    birthday: z.coerce
        .date("Invalid date")
        .min(new Date(1900, 0, 1), "Birthday must be after January 1, 1900.")
        .max(
            new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
            "You must be at least 18 years old."
        ) as z.ZodCoercedDate<Date>,
    password: z.string(),
    refinePassword: z.string(),
    file: z.any().optional(),
    phones: z.array(PhoneSchema).optional(),
    notifications: NotificationSettingsSchema,
};

const PersonSchema = z.object({
    type: z.literal("Person"),
    ...commonSchema,
}).refine((data) => data.password === data.refinePassword, {
    message: "Passwords do not match.",
    path: ["refinePassword"],
});

const CompanySchema = z.object({
    type: z.literal("Company"),
    companyName: z.string(),
    tin: z.string(),
    position: z.string(),
    ...commonSchema,
}).refine((data) => data.password === data.refinePassword, {
    message: "Passwords do not match.",
    path: ["refinePassword"],
});

export const RegistrationSchema = z.discriminatedUnion('type', [PersonSchema, CompanySchema]);
export type RegistrationForm = z.infer<typeof RegistrationSchema>;
