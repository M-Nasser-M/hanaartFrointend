import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Avatar, Box, Flex, Separator, Text } from "@radix-ui/themes";
import { options } from "@/app/api/auth/[...nextauth]/authOtions";
import { AuthError, DataValidationError } from "@/lib/exceptions";
import { getUserProfile } from "@/services/server/profileServiceServer";
import { SessionSchema } from "@/types/sharedTypes";
import type { Locale } from "@/types/sharedTypes";
import { UserProfileSchema } from "@/types/user";
import { getServerSession } from "next-auth";
import ProfileTabs from "./ProfileTabs";
import { safeParse } from "valibot";
import dynamic from "next/dynamic";

const EditUserEmailForm = dynamic(() => import("./EditUserEmailForm"));
const EditUserPhoneForm = dynamic(() => import("./EditUserPhoneForm"));

type Props = {
  params: { locale: Locale };
};

const Page = async ({ params: { locale } }: Props) => {
  const sesssion = await getServerSession(options);

  const validateSession = safeParse(SessionSchema, sesssion);

  if (!validateSession.success) throw new AuthError();

  const UserData = await getUserProfile(validateSession.output.user.id);

  const validateData = safeParse(UserProfileSchema, UserData);

  if (!validateData.success) throw new DataValidationError("User Profile");

  unstable_setRequestLocale(locale);

  const t = await getTranslations("profile");

  const translations = {
    addresses: t("addresses"),
    orderno: t("orderno"),
    orders: t("orders"),
    orderstatus: t("orderstatus"),
    total: t("total"),
    governorate: t("governorate"),
    city: t("city"),
    street: t("street"),
    apartmentno: t("apartmentno"),
    username: t("username"),
    building: t("building"),
    details: t("details"),
    firstname: t("firstname"),
    lastname: t("lastname"),
    floor: t("floor"),
    editaddress: t("editaddress"),
    edituserinfo: t("edituserinfo"),
    phone: t("phone"),
    email: t("email"),
  };

  return (
    <Flex gap="2" px="4" direction={{ initial: "column", md: "row" }}>
      <Flex className="md:max-w-[30%]" direction="column" gap="4">
        <Avatar
          src={validateSession.output.user.image}
          fallback={`${validateSession.output.user.name[0]}`}
        />
        <Text color="crimson" as="label" size="4">
          {t("username")}
        </Text>
        <Text size="4">{validateData.output.username}</Text>
        <Flex direction="row" justify="between">
          <Text color="crimson" as="label" size="4">
            {t("email")}
          </Text>
          <EditUserEmailForm translations={translations} />
        </Flex>
        <Text size="4">
          {validateData.output.primaryEmail
            ? validateData.output.primaryEmail
            : validateData.output.email}
        </Text>
        <Flex direction="row" justify="between">
          <Text color="crimson" as="label" size="4">
            {t("phone")}
          </Text>
          <EditUserPhoneForm translations={translations} />
        </Flex>
        <Text size="4">{validateData.output.phone}</Text>
      </Flex>
      <Flex grow="1">
        <Separator size="4" color="crimson" orientation="vertical" />
      </Flex>
      <Box width="100%">
        <ProfileTabs translations={translations} user={validateData.output} />
      </Box>
    </Flex>
  );
};

export default Page;
