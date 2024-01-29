"use client";

import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import { valibotResolver } from "@hookform/resolvers/valibot";
import type { Governorates } from "@/lib/types/city-governorate";
import { Controller, useForm } from "react-hook-form";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Edit, XCircle } from "lucide-react";
import {
  EditAddressForm,
  EditAddressFormSchema,
} from "@/lib/formSchemas/address";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextArea,
  TextFieldInput,
} from "@radix-ui/themes";
import type { profileTranslations } from "../../../../messages/messagesKeys";

type Props = {
  translations: profileTranslations;
};

const governoratesAtom = atom<Governorates>([]);

const EditAddressForm = ({ translations }: Props) => {
  const [governorates, setGovernorates] = useAtom(governoratesAtom);

  const locale = useGetLocalFromPathname();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EditAddressForm>({
    resolver: valibotResolver(EditAddressFormSchema),
  });

  useEffect(() => {
    (async () => {
      fetch("/governorates.json")
        .then((res) => res.json())
        .then((data: Governorates) => setGovernorates(data));
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onSubmit = (data: EditAddressForm) => console.log(data);

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="outline">
          {translations.editaddress}
          <Edit />
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative" size="4">
        <Dialog.Title color="crimson">{translations.editaddress}</Dialog.Title>
        <Dialog.Close>
          <Button
            className="absolute top-2 right-2  cursor-pointer"
            variant="soft"
          >
            <XCircle />
          </Button>
        </Dialog.Close>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap="2" direction="column">
            <Text as="label" size="4" color="crimson">
              {translations.firstname}
            </Text>
            <TextFieldInput {...register("firstname")} />
            {errors.firstname && errors.firstname.message}

            <Text as="label" size="4" color="crimson">
              {translations.lastname}
            </Text>
            <TextFieldInput type="text" {...register("lastname")} />
            {errors.lastname && errors.lastname.message}

            <Text as="label" size="4" color="crimson">
              {translations.phone}
            </Text>
            <TextFieldInput type="text" {...register("phone")} />
            {errors.phone && errors.phone.message}

            <Text as="label" size="4" color="crimson">
              {translations.governorate}
            </Text>
            <Controller
              name="governorate"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select.Root onValueChange={field.onChange} {...field}>
                  <Select.Trigger />
                  <Select.Content>
                    {governorates &&
                      governorates.length > 0 &&
                      governorates.map((governorate) => (
                        <Select.Item
                          key={governorate.id}
                          value={governorate.governorate_name_en}
                        >
                          {locale === "en"
                            ? governorate.governorate_name_en
                            : governorate.governorate_name_ar}
                        </Select.Item>
                      ))}
                  </Select.Content>
                </Select.Root>
              )}
            />
            {errors.governorate && errors.governorate.message}

            <Text as="label" size="4" color="crimson">
              {translations.street}
            </Text>
            <TextFieldInput {...register("street")} type="text" />
            {errors.street && errors.street.message}

            <Text as="label" size="4" color="crimson">
              {translations.building}
            </Text>
            <TextFieldInput {...register("building")} type="text" />
            {errors.building && errors.building.message}

            <Text as="label" size="4" color="crimson">
              {translations.floor}
            </Text>
            <TextFieldInput
              {...register("floor", { valueAsNumber: true })}
              type="text"
            />
            {errors.floor && errors.floor.message}

            <Text as="label" size="4" color="crimson">
              {translations.apartmentno}
            </Text>
            <TextFieldInput {...register("apartmentno")} type="text" />
            {errors.apartmentno && errors.apartmentno.message}

            <Text as="label" size="4" color="crimson">
              {translations.details}
            </Text>
            <TextArea {...register("details")} />
            {errors.details && errors.details.message}

            <Button mt="4" type="submit" variant="outline">
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EditAddressForm;
