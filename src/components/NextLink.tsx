import Link from "next/link";
import React, { ReactNode } from "react";

type Props = { children: ReactNode; href: string; className?: string };

const NextLink = ({ children, href, className }: Props) => {
  return (
    <Link className={className} href={href}>
      {children}
    </Link>
  );
};

export default NextLink;
