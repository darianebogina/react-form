import {z} from "zod";

export const PhoneTypeSchema = z.enum(["mobile", "work", "home"]);
export type PhoneType = z.infer<typeof PhoneTypeSchema>;

export const PhoneSchema = z.object({
    phone: z.string().min(1, "Phone number is required"),
    type: PhoneTypeSchema,
});
