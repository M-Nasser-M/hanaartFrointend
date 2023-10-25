import React from "react";
import ProductsGrid from "./ProductsGrid";
import { Locale } from "@/types/sharedTypes";
import { getProductUsingSlug } from "@/services/ProductService";

export const revalidate = 3600;

type Props = { params: { locale: Locale }; searchParams: { page?: string } };

const Page = async ({ params }: Props) => {
  return <ProductsGrid />;
};

export default Page;
