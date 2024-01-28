import { MetaSchema } from "./sharedTypes";
import {
  Output,
  array,
  boolean,
  coerce,
  email,
  enum_,
  length,
  null_,
  nullable,
  number,
  object,
  optional,
  regex,
  startsWith,
  string,
  union,
} from "valibot";
import {
  ProductDataSchema,
  ProductSearchResponseElementSchema,
} from "./product";

export const EmailSchema = string("invalid email", [email("invalid email")]);

export type Email = Output<typeof EmailSchema>;

export const PhoneSchema = string("phone is required", [
  length(11, "phone should be 11 number long"),
  startsWith("0", "phone number should start with 0"),
  regex(/^[0-9]+$/, "should be all numbers"),
]);

export type Phone = Output<typeof PhoneSchema>;

enum Provider {
  google = "google",
  facebook = "facebook",
  instagram = "instagram",
}

export const UserDataSchema = object({
  id: number(),
  username: string(),
  email: EmailSchema,
  provider: enum_(Provider),
  confirmed: boolean(),
  blocked: boolean(),
  phone: nullable(PhoneSchema),
  primaryEmail: nullable(EmailSchema),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
});

export type UserData = Output<typeof UserDataSchema>;

export const UserSchema = object({
  data: UserDataSchema,
  meta: MetaSchema,
});

export type User = Output<typeof UserSchema>;

export const AddressDataSchema = object({
  id: number(),
  building: nullable(string()),
  apartment_no: nullable(string()),
  street: string(),
  first_name: string(),
  last_name: string(),
  governorate: string(),
  floor: number(),
  details: nullable(string()),
  phone: nullable(PhoneSchema),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
});

export type AddressData = Output<typeof AddressDataSchema>;

export const AddressSchema = object({
  data: AddressDataSchema,
  meta: MetaSchema,
});

export type Address = Output<typeof AddressSchema>;

enum OrderStatus {
  pendingpayment = "Pending Payment",
  accepted = "Accepted",
  prepared = "Prepared",
  outfordelivery = "Out For Delivery",
  delivered = "Delivered",
  canceled = "Canceled",
}

enum PaymenetStatus {
  pending = "Pending",
  sucess = "Sucess",
  declined = "Declined",
}

export const OrderItemsSchema = object({
  quantity: number(),
  product: optional(ProductDataSchema),
});

export const OrderDataSchema = object({
  id: number(),
  total: nullable(number()),
  estimated_delivery: nullable(number()),
  order_status: enum_(OrderStatus),
  payment_status: enum_(PaymenetStatus),
  paymob_order_id: optional(nullable(number())),
  paymob_transaction_id: optional(nullable(number())),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  address: optional(nullable(AddressDataSchema)),
  order_items: optional(
    union([array(AddressDataSchema), array(AddressDataSchema)])
  ),
  users_permissions_user: optional(nullable(UserDataSchema)),
});

export type OrderData = Output<typeof OrderDataSchema>;

export const OrderSchema = object({
  data: OrderDataSchema,
  meta: MetaSchema,
});

export type Order = Output<typeof OrderSchema>;

export const CartItemDataSchema = object({
  id: number(),
  product: optional(nullable(ProductDataSchema)),
  quantity: union([number(), null_()]),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
});

export type CartItemData = Output<typeof CartItemDataSchema>;

export const CartItemSchema = object({
  data: CartItemDataSchema,
  meta: MetaSchema,
});

export type CartItem = Output<typeof CartItemSchema>;

export const CartDataSchema = object({
  id: number(),
  users_permisssions_user: optional(nullable(UserDataSchema)),
  cart_items: union([array(CartItemDataSchema), array(CartItemDataSchema)]),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
});

export type CartData = Output<typeof CartDataSchema>;

export const CartSchema = object({
  data: CartDataSchema,
  meta: MetaSchema,
});

export type Cart = Output<typeof CartSchema>;

export const LocalStorageCartItemSchema = object({
  product: ProductSearchResponseElementSchema,
  quantity: number(),
});

export const LocalStorageCartItemsSchema = array(LocalStorageCartItemSchema);

export type localStorageCartItem = Output<typeof LocalStorageCartItemSchema>;

export type localStorageCartItems = Output<typeof LocalStorageCartItemsSchema>;

export const UserProfileSchema = object({
  id: number(),
  username: string(),
  email: EmailSchema,
  provider: enum_(Provider),
  confirmed: boolean(),
  blocked: boolean(),
  phone: nullable(PhoneSchema),
  primaryEmail: nullable(EmailSchema),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  addresses: optional(
    union([array(AddressDataSchema), array(AddressDataSchema)])
  ),
  orders: optional(union([array(OrderDataSchema), array(OrderDataSchema)])),
  cart: optional(CartDataSchema),
});

export type UserProfile = Output<typeof UserProfileSchema>;
