import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { options } from "@/app/api/auth/[...nextauth]/authOtions";
import { AuthError, DataValidationError } from "@/lib/exceptions";
import { getUserProfile } from "@/services/profileService";
import { SessionSchema } from "@/types/sharedTypes";
import type { Locale } from "@/types/sharedTypes";
import { getServerSession } from "next-auth";
import { UserSchema } from "@/types/user";
import { safeParse } from "valibot";
import Profile from "./Profile";

type Props = {
  params: { locale: Locale };
};
const Page = async ({ params: { locale } }: Props) => {
  const sesssion = await getServerSession(options);
  const validateSession = safeParse(SessionSchema, sesssion);

  if (!validateSession.success) throw new AuthError();

  const UserData = await getUserProfile(
    validateSession.output.user.id,
    validateSession.output.jwt
  );
  const validateData = safeParse(UserSchema, UserData);

  if (!validateData.success) throw new DataValidationError("User Profile Data");

  unstable_setRequestLocale(locale);

  const t = await getTranslations("profile");

  return (
    <Profile session={validateSession.output} userData={validateData.output} />
  );
};

export default Page;
