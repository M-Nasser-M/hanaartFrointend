import {
  Output,
  array,
  coerce,
  nullType,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import {
  ColorSchema,
  ImageSchema,
  LocaleSchema,
  MetaSchema,
  SellerSchema,
  SeoSchema,
} from "./sharedTypes";

export const ProductDataSchema = object({
  id: number(),
  name: string(),
  price: number(),
  description: string(),
  details: optional(union([nullType(), string()])),
  offer_price: optional(union([nullType(), string()])),
  availableStock: string(),
  onholdStock: optional(union([nullType(), string()])),
  soldStock: optional(union([nullType(), string()])),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
  locale: LocaleSchema,
  category: optional(union([nullType(), string()])),
  slug: string(),
  images: optional(array(ImageSchema)),
  cover: optional(ImageSchema),
  colors: optional(union([nullType(), ColorSchema])),
  seller: optional(SellerSchema),
  seo: optional(SeoSchema),
});

export type ProductData = Output<typeof ProductDataSchema>;

export const ProductsSchema = object({
  data: array(ProductDataSchema),
  meta: MetaSchema,
});

export type Products = Output<typeof ProductsSchema>;

export const ProductSchema = object({
  data: ProductDataSchema,
  meta: MetaSchema,
});

export type Product = Output<typeof ProductSchema>;
