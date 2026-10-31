import {z} from "zod";

export const NotificationSettingsSchema = z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
});


