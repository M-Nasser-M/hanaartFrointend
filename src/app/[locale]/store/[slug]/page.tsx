import { AspectRatio, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { getProductUsingSlug } from "@/services/ProductServiceServer";
import { ProductsSchema } from "@/types/product";
import { safeParse } from "valibot";
import Image from "next/image";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const product = await getProductUsingSlug(slug);

  const validatedData = safeParse(ProductsSchema, product);
  if (!validatedData.success) console.log(validatedData.issues[0]);

  if (validatedData.success) {
    const product = validatedData.output.data[0];
    return (
      <Flex
        gap="4"
        justify="center"
        direction={{ initial: "column", md: "row" }}
      >
        <Flex p="4" align="center" className="md:w-[70%]">
          <AspectRatio ratio={16 / 9}>
            <Image
              alt={product.cover.alternativeText || "cover image"}
              src={product.cover.url}
              fill
            />
          </AspectRatio>
        </Flex>
        <Flex p="4" direction="column" gap="4" className="md:w-[30%]">
          <Heading size="7" color="crimson" highContrast>
            {product.name}
          </Heading>
          <Heading size="7">{product.price}</Heading>
          <Heading size="5">{product.description}</Heading>
          <Button size="4" variant="outline" className="w-full">
            Add To Cart
          </Button>
          <Text
            suppressHydrationWarning
            dangerouslySetInnerHTML={{ __html: product.details! }}
            size="7"
            as="p"
          />
        </Flex>
      </Flex>
    );
  }
};

export default Page;
