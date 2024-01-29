import { EmailSchema, PhoneSchema } from "@/lib/types/user";
import { Output, object } from "valibot";

export const EditUserInfoFormSchema = object({
  email: EmailSchema,
  phone: PhoneSchema,
});

export type EditUserInfoForm = Output<typeof EditUserInfoFormSchema>;
