import { getProductUsingSlug } from "@/services/ProductServiceServer";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { DataValidationError } from "@/lib/exceptions";
import { getTranslations } from "next-intl/server";
import { ProductsSchema } from "@/types/product";
import { safeParse } from "valibot";
import Carousel from "./Carousel";

type Props = { params: { slug: string } };

const Page = async ({ params: { slug } }: Props) => {
  const product = await getProductUsingSlug(slug);

  const validatedData = safeParse(ProductsSchema, product);
  if (!validatedData.success) throw new DataValidationError(`Product ${slug}`);

  const t = await getTranslations("store");

  return (
    <Flex gap="4" justify="center" direction={{ initial: "column", md: "row" }}>
      <Flex
        p="4"
        align="center"
        direction="column"
        gap="4"
        className="md:w-[70%]"
      >
        <Carousel
          cover={validatedData.output.data[0].cover}
          images={validatedData.output.data[0].images}
        />
      </Flex>
      <Flex p="4" direction="column" gap="4" className="md:w-[30%]">
        <Heading size="7" color="crimson" highContrast>
          {validatedData.output.data[0].name}
        </Heading>
        <Heading size="7">{`${validatedData.output.data[0].price} ${t(
          "currency"
        )}`}</Heading>
        <Heading size="5">{validatedData.output.data[0].description}</Heading>
        <Button size="4" variant="outline" className="w-full">
          {t("addtocart")}
        </Button>
        <Text
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: validatedData.output.data[0].details!,
          }}
          size="7"
          as="p"
        />
      </Flex>
    </Flex>
  );
};

export default Page;
