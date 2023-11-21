import { EmailSchema, PhoneSchema } from "@/types/user";
import { Output, object } from "valibot";

export const EditUserInfoFormSchema = object({
  email: EmailSchema,
  phone: PhoneSchema,
});

export type EditUserInfoForm = Output<typeof EditUserInfoFormSchema>;
