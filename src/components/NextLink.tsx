import React, { ReactNode } from "react";
import { useLocale } from "next-intl";
import Link from "next/link";

type Props = { children: ReactNode; href: string; className?: string };

const NextLink = ({ children, href, className }: Props) => {
  const locale = useLocale();
  return (
    <Link className={className} href={`/${locale}${href}`}>
      {children}
    </Link>
  );
};

export default NextLink;
