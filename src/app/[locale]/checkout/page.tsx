import type { Locale } from "@/types/sharedTypes";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = { params: { locale: Locale } };

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return <div>Checkout</div>;
};

export default Page;
