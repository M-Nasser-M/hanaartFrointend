"use client";
import { Avatar, Box, Button, DropdownMenu } from "@radix-ui/themes";
import { sessionAtom } from "@/atoms/atoms";
import { signOut } from "next-auth/react";
import NextLink from "../NextLink";
import { useAtom } from "jotai";
import React from "react";

type Props = {
  profile: string;
  signout: string;
};

const ProfileDropdown = ({ profile, signout }: Props) => {
  const [session, setSession] = useAtom(sessionAtom);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Box>
          <Avatar radius="full" fallback={`${session?.user.name[0]}`} />
        </Box>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content variant="soft">
        <DropdownMenu.Item>
          <NextLink href="/profile">{profile}</NextLink>
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
            {signout}
          </Button>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ProfileDropdown;
