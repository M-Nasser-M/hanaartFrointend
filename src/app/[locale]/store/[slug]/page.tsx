import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { getProductUsingSlug } from "@/services/server/ProductServiceServer";
import { Badge, Button, Flex, Heading, Text } from "@radix-ui/themes";
import { DataValidationError } from "@/lib/utils/exceptions";
import type { Locale } from "@/types/sharedTypes";
import { ProductsSchema } from "@/types/product";
import { safeParse } from "valibot";
import Carousel from "./Carousel";

type Props = { params: { slug: string; locale: Locale } };

const Page = async ({ params: { slug, locale } }: Props) => {
  const product = await getProductUsingSlug(slug);
  unstable_setRequestLocale(locale);
  const validatedData = safeParse(ProductsSchema, product);
  if (!validatedData.success) throw new DataValidationError(`Product ${slug}`);

  const t = await getTranslations("store");

  return (
    <Flex gap="4" justify="center" direction={{ initial: "column", md: "row" }}>
      <Carousel
        cover={validatedData.output.data[0].cover}
        images={validatedData.output.data[0].images}
      />

      <Flex p="4" direction="column" gap="4" className="md:w-1/3">
        <Heading className="col" size="7" color="crimson" highContrast>
          {validatedData.output.data[0].name}
        </Heading>
        <Heading size="7">{`${validatedData.output.data[0].price} ${t(
          "currency"
        )}`}</Heading>
        <Heading size="5">{validatedData.output.data[0].description}</Heading>
        <Flex direction="row" gap="2" justify="between">
          <Badge
            size="2"
            color={
              Number(validatedData.output.data[0].availableStock) > 0
                ? "green"
                : "red"
            }
          >
            {Number(validatedData.output.data[0].availableStock) > 0
              ? t("instock")
              : t("outofstock")}
          </Badge>
          <Text>{`${validatedData.output.data[0].availableStock} items remaining`}</Text>
        </Flex>
        <Button size="4" variant="outline" className="w-full">
          {t("addtocart")}
        </Button>
        <Text
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: validatedData.output.data[0].details!,
          }}
          size="7"
          as="div"
        />
      </Flex>
    </Flex>
  );
};

export default Page;
