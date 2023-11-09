import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { useLocale, useTranslations } from "next-intl";
import { sessionAtom } from "@/atoms/atoms";
import { signOut } from "next-auth/react";
import NextLink from "../NextLink";
import { useAtom } from "jotai";
import React from "react";

const ProfileDropdown = () => {
  const [session, setSession] = useAtom(sessionAtom);
  const t = useTranslations("navbar");
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box>
          <Avatar radius="full" fallback={`${session?.user.name[0]}`} />
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>
          <NextLink href="/profile">{t("profile")}</NextLink>
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>
          <Button
            variant="ghost"
            onClick={() => {
              setSession(null);
              signOut();
            }}
          >
            {t("signout")}
          </Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
