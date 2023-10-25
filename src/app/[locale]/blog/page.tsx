import { getBlogPage } from "@/services/BlogService";
import { Locale } from "@/types/sharedTypes";
import { blogsSchema } from "@/types/blog";
import BlogsGrid from "./BlogsGrid";
import { safeParse } from "valibot";
import { locales } from "@/i18n";
import React from "react";

export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
type Props = { params: { locale: Locale }; searchParams: { page?: number } };

const Page = async ({ params: { locale }, searchParams: { page } }: Props) => {
  const blogsPage = await getBlogPage(locale, page);

  const validatedData = safeParse(blogsSchema, blogsPage);

  if (validatedData.success) {
    return <BlogsGrid blogs={validatedData.output} />;
  }
};

export default Page;
