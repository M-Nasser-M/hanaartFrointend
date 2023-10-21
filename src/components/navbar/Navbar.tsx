"use client";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Box, Button, Flex, Portal } from "@radix-ui/themes";
import { Menu, XCircle } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import NextLink from "../NextLink";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  const t = useTranslations("navbar");
  const locale = useLocale();
  return (
    <Flex
      className="shadow-1"
      justify="between"
      width="100%"
      gap="4"
      py="4"
      px="6"
      mb="6"
    >
      <NavigationMenu.Root>
        <Box display={{ initial: "none", md: "block" }}>
          <NavigationMenu.List className="text-4">
            <Flex display={{ initial: "none", md: "flex" }} gap="4">
              <NextLink href="/">
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                  {t("home")}
                </NavigationMenu.Item>
              </NextLink>
              <NextLink href={`/${locale}/store`}>
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                  {t("store")}
                </NavigationMenu.Item>
              </NextLink>
              <NextLink href={`/${locale}/blog`}>
                <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                  {t("blog")}
                </NavigationMenu.Item>
              </NextLink>
            </Flex>
          </NavigationMenu.List>
        </Box>
        <Box display={{ initial: "block", md: "none" }}>
          <Dialog.Root>
            <Dialog.Trigger>
              <Menu />
            </Dialog.Trigger>
            <Dialog.Overlay className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
              <Dialog.Content className=" fixed z-50 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm">
                <Dialog.Close className="absolute top-2 right-2">
                  <XCircle />
                </Dialog.Close>
                <Dialog.Title>Logo</Dialog.Title>
                <NavigationMenu.List className="ml-4 mt-4 ">
                  <NextLink href="/">
                    <Dialog.Close asChild>
                      <NavigationMenu.Item className="active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                        {t("home")}
                      </NavigationMenu.Item>
                    </Dialog.Close>
                  </NextLink>
                  <NextLink href={`/${locale}/store`}>
                    <Dialog.Close asChild>
                      <NavigationMenu.Item className=" active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                        {t("store")}
                      </NavigationMenu.Item>
                    </Dialog.Close>
                  </NextLink>
                  <NextLink href={`/${locale}/blog`}>
                    <Dialog.Close asChild>
                      <NavigationMenu.Item className=" active:bg-crimson-9 hover:bg-crimson-9 text-4 p-1 rounded-3">
                        {t("blog")}
                      </NavigationMenu.Item>
                    </Dialog.Close>
                  </NextLink>
                </NavigationMenu.List>
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Root>
        </Box>
      </NavigationMenu.Root>
      <Flex gap="2">
        <ThemeSwitcher />
        <LanguageSwitcher />
        <Button>{t("signin")}</Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
