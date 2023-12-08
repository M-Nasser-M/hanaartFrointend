import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/sharedTypes";
import CartList from "./CartList";
import { useTranslations } from "next-intl";

type Props = {
  params: { locale: Locale };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = useTranslations("cart");
  console.log(t("continueshopping"));

  return <CartList />;
};

export default Page;
