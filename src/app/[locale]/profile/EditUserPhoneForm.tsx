"use client";

import { updatePhone } from "@/services/client/ProfileServiceClinet";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useToast } from "@/components/ui/use-toast";
import { Edit, XCircle } from "lucide-react";
import { Translations } from "./ProfileTabs";
import { useRouter } from "next/navigation";
import { sessionAtom } from "@/atoms/atoms";
import { PhoneSchema } from "@/types/user";
import { useForm } from "react-hook-form";
import { Output, object } from "valibot";
import { useAtomValue } from "jotai";
import { useRef } from "react";
import {
  Button,
  Dialog,
  Flex,
  IconButton,
  Text,
  TextFieldInput,
} from "@radix-ui/themes";

type Props = { translations: Translations };

const PhoneFormSchema = object({ phone: PhoneSchema });
type PhoneForm = Output<typeof PhoneFormSchema>;

const EditUserPhoneForm = ({ translations }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const closeRef = useRef<HTMLButtonElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneForm>({
    resolver: valibotResolver(PhoneFormSchema),
  });

  const session = useAtomValue(sessionAtom);

  const onSubmit = async (data: PhoneForm) => {
    const res = await updatePhone(data.phone, session!);
    if (!res) {
      if (closeRef.current) closeRef.current.click();
      toast({ title: "error updating your phone pls try again later" });
      return;
    }

    if (closeRef.current) closeRef.current.click();
    toast({ title: "phone updated successfully" });
    router.refresh();
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <IconButton className="cursor-pointer" variant="ghost">
          <Edit />
        </IconButton>
      </Dialog.Trigger>
      <Dialog.Content size="4" className="relative">
        <Dialog.Title color="crimson">{translations.edituserinfo}</Dialog.Title>
        <Dialog.Close ref={closeRef}>
          <Button
            className="absolute top-2 right-2  cursor-pointer"
            variant="soft"
          >
            <XCircle />
          </Button>
        </Dialog.Close>
        <form color="red" onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="2">
            <Text as="label" size="4" color="crimson">
              {translations.phone}
            </Text>
            <TextFieldInput {...register("phone")} />
            {errors.phone && errors.phone.message}
            <Button type="submit" variant="outline">
              Submit
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditUserPhoneForm;
