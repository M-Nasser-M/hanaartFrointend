import { useTranslations } from "next-intl";
import { Products } from "@/types/product";
import Image from "next/image";
import {
  AspectRatio,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Inset,
  Text,
} from "@radix-ui/themes";

type Props = { products: Products };

const ProductsGrid = ({ products }: Props) => {
  const t = useTranslations("store");

  return (
    <Grid
      columns={{ initial: "1", md: "2", lg: "3" }}
      gap="3"
      mb="9"
      width="100%"
    >
      {products.data.map((product) => (
        <Card key={product.id}>
          <Inset clip="padding-box" side="top" pb="current">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt={product.cover?.alternativeText || ""}
                fill
                src={product.cover?.url!}
              />
            </AspectRatio>
          </Inset>
          <Heading size="6" as="h3">
            {product.name}
          </Heading>
          <Text size="4" as="p">
            description
          </Text>
          <Flex justify="between">
            <Heading as="h3">
              {product.offer_price ? product.offer_price : product.price}{" "}
              {t("currency")}
            </Heading>
            <Button>{t("addtocart")}</Button>
          </Flex>
        </Card>
      ))}
    </Grid>
  );
};

export default ProductsGrid;
