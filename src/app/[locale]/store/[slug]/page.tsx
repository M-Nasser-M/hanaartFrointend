import { getProductUsingSlug } from "@/services/ProductService";

type Props = { params: { slug: string } };

export const Page = async ({ params: { slug } }: Props) => {
  const product = await getProductUsingSlug(slug);
  console.log(product);

  return <div>Product</div>;
};