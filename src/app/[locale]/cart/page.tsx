import { unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/types/sharedTypes";
import React from "react";

type Props = {
  params: { locale: Locale };
};

const Page = ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  return <div>Cart Page</div>;
};

export default Page;
