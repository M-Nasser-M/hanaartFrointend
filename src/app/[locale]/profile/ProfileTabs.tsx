"use client";
import { UserProfile } from "@/lib/types/user";
import {
  Box,
  Flex,
  Grid,
  Separator,
  Table,
  Tabs,
  Text,
} from "@radix-ui/themes";
import dynamic from "next/dynamic";
import type { profileTranslations } from "../../../../messages/messagesKeys";

const EditAddressForm = dynamic(() => import("./EditAddressForm"));

type Props = {
  translations: profileTranslations;
  user: UserProfile;
};

const AddressInfo = ({ label, info }: { label: string; info: string }) => {
  return (
    <Flex gap="1">
      <Text color="crimson" as="label" size="4">
        {label}:
      </Text>
      <Text size="3">{info}</Text>
    </Flex>
  );
};

const ProfileTabs = ({ translations, user }: Props) => {
  return (
    <Tabs.Root defaultValue="orders">
      <Tabs.List>
        <Tabs.Trigger value="orders">
          <Text size="4">{translations.orders}</Text>
        </Tabs.Trigger>
        <Tabs.Trigger value="addresses">
          <Text size="4">{translations.addresses}</Text>
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="orders">
        {user.orders && user.orders.length > 0 && (
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {translations.orderno}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {translations.total}
                </Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>
                  {translations.orderstatus}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {user.orders.map((order) => (
                <Table.Row key={order.id}>
                  <Table.RowHeaderCell>{order.id}</Table.RowHeaderCell>
                  <Table.Cell>{order.total}</Table.Cell>
                  <Table.Cell>{order.order_status}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Tabs.Content>

      <Tabs.Content value="addresses">
        {user.addresses && user.addresses.length > 0 && (
          <Flex direction="column" gap="4" mt="2">
            {user.addresses.map((address) => (
              <Box p="0" m="0" key={address.id}>
                <Grid p="4" gap="4" columns={{ initial: "1", md: "2" }} mt="2">
                  <AddressInfo
                    label={translations.firstname}
                    info={address.first_name}
                  />
                  <AddressInfo
                    label={translations.lastname}
                    info={address.last_name}
                  />
                  <AddressInfo
                    label={translations.phone}
                    info={address.phone || ""}
                  />
                  <AddressInfo
                    label={translations.governorate}
                    info={address.governorate}
                  />
                  <AddressInfo
                    label={translations.street}
                    info={address.street}
                  />
                  <AddressInfo
                    label={translations.building}
                    info={address.building || ""}
                  />
                  <AddressInfo
                    label={translations.floor}
                    info={`${address.floor}`}
                  />
                  <AddressInfo
                    label={translations.apartmentno}
                    info={address.apartment_no || ""}
                  />
                  <AddressInfo
                    label={translations.details}
                    info={address.details || ""}
                  />

                  <EditAddressForm translations={translations} />
                </Grid>
                <Separator
                  my="4"
                  size="4"
                  color="crimson"
                  orientation="horizontal"
                />
              </Box>
            ))}
          </Flex>
        )}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default ProfileTabs;
