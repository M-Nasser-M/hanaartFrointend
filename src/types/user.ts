import {
  Output,
  array,
  boolean,
  coerce,
  enum_,
  null_,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

enum Provider {
  google = "google",
  facebook = "facebook",
  instagram = "instagram",
}

export const AddressSchema = object({
  id: number(),
  building: union([null_(), string()]),
  apartment_no: union([null_(), string()]),
  street: string(),
  first_name: string(),
  last_name: string(),
  city: string(),
  floor: number(),
  landmarks: union([null_(), string()]),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
});

export type Address = Output<typeof AddressSchema>;

export const OrderSchema = object({});

export type Orders = Output<typeof OrderSchema>;

export const CartSchema = object({});

export type Cart = Output<typeof CartSchema>;

export const UserSchema = object({
  id: number(),
  username: string(),
  email: string(),
  provider: enum_(Provider),
  confirmed: boolean(),
  blocked: boolean(),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  addresses: optional(union([array(AddressSchema), array(AddressSchema)])),
  orders: optional(union([array(OrderSchema), array(OrderSchema)])),
  cart: optional(CartSchema),
});

export type User = Output<typeof UserSchema>;
