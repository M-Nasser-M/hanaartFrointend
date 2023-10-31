"use client";
import { useTranslations } from "next-intl";
import { sessionAtom } from "@/atoms/atoms";
import { useAtomValue } from "jotai";
import React from "react";
import {
  Avatar,
  Box,
  Flex,
  Separator,
  Table,
  Tabs,
  Text,
} from "@radix-ui/themes";

const Profile = () => {
  const session = useAtomValue(sessionAtom);
  const t = useTranslations("profile");

  return (
    <Flex gap="2" px="4" direction={{ initial: "column", md: "row" }}>
      <Flex direction="column" gap="4">
        <Avatar
          src={session?.user.image}
          fallback={`${session?.user.name[0]}`}
        />
        <Text color="crimson" as="label" size="4">
          {t("username")}
        </Text>
        <Text size="4">{session?.user.name}</Text>
        <Text color="crimson" as="label" size="4">
          {t("email")}
        </Text>
        <Text size="4">{session?.user.email}</Text>
      </Flex>
      <Flex grow="1">
        <Separator size="4" color="crimson" orientation="vertical" />
      </Flex>
      <Box width="100%">
        <Tabs.Root>
          <Tabs.List>
            <Tabs.Trigger value="orders">{t("orders")}</Tabs.Trigger>
            <Tabs.Trigger value="addresses">{t("addresses")}</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="orders">
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>
                    {t("orderno")}
                  </Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>{t("total")}</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>
                    {t("orderstatus")}
                  </Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
                  <Table.Cell>danilo@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
                  <Table.Cell>zahra@example.com</Table.Cell>
                  <Table.Cell>Admin</Table.Cell>
                </Table.Row>

                <Table.Row>
                  <Table.RowHeaderCell>Jasper Eriksson</Table.RowHeaderCell>
                  <Table.Cell>jasper@example.com</Table.Cell>
                  <Table.Cell>Developer</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </Tabs.Content>

          <Tabs.Content value="addresses">
            <Text size="2">Access and update your addresses.</Text>
          </Tabs.Content>
        </Tabs.Root>
      </Box>
    </Flex>
  );
};

export default Profile;
