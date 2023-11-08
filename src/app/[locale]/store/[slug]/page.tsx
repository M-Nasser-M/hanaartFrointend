import { getProductUsingSlug } from "@/services/ProductServiceServer";
import ProductPage from "./ProductPage";
import { safeParse } from "valibot";
import { ProductsSchema } from "@/types/product";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const product = await getProductUsingSlug(slug);

  const validatedData = safeParse(ProductsSchema, product);
  if (!validatedData.success) console.log(validatedData.issues[0]);

  if (validatedData.success) {
    return <ProductPage product={validatedData.output.data[0]} />;
  }
};

export default Page;
