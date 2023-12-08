import { useGetLocalFromPathname } from "@/lib/hooks/useGetLocaleFromPathname";
import React, { ReactNode } from "react";
import Link from "next/link";

type Props = { children: ReactNode; href: string; className?: string };

const NextLink = ({ children, href, className }: Props) => {
  const locale = useGetLocalFromPathname();
  return (
    <Link className={className} href={`/${locale}${href}`}>
      {children}
    </Link>
  );
};

export default NextLink;
