import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/Accordion/AccordionStyled";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import type { Locale } from "@/lib/types/sharedTypes";
import { Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import {
  checkoutKeys,
  checkoutTranslations,
} from "../../../../../messages/messagesKeys";

type Props = { params: { locale: Locale } };

const Page = async ({ params: { locale } }: Props) => {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("checkout");
  const translations = checkoutKeys.reduce((obj, curr) => {
    obj[curr] = t(curr);
    return obj;
  }, {} as checkoutTranslations);

  return (
    <Flex direction="row" width="100%" gap="4">
      <Flex direction="column" className="w-2/3">
        <AccordionRoot collapsible defaultValue="address" type="single">
          <AccordionItem value="address">
            <AccordionTrigger>{translations.shippingdetails}</AccordionTrigger>
            <AccordionContent>this is content for address</AccordionContent>
          </AccordionItem>
          <AccordionItem value="payment">
            <AccordionTrigger>{translations.paymentdetails}</AccordionTrigger>
            <AccordionContent>this is content for payment</AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </Flex>
      <Flex direction="column" className="w-1/3">
        <Card className="text-center">
          <Heading as="h3">{translations.ordersummary}</Heading>
          <Flex direction="column" gap="4">
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">Subtotal:</Text>
              <Text>$0.00</Text>
            </Flex>
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">{translations.shipping}:</Text>
              <Text>$0.00</Text>
            </Flex>
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">{translations.tax}:</Text>
              <Text>$0.00</Text>
            </Flex>
            <hr />
            <Flex direction="row" justify="between" gap="4">
              <Text as="label">{translations.total}:</Text>
              <Text>$0.00</Text>
            </Flex>
            <hr />
            <Flex direction="row" justify="between" gap="4"></Flex>
          </Flex>
          <Button>Place Order</Button>
        </Card>
      </Flex>
    </Flex>
  );
};

export default Page;
