import { type } from "os";
import {
  Input,
  array,
  coerce,
  email,
  enumType,
  nullType,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

export const PaginationSchema = object({
  page: optional(union([nullType(), number()])),
  pageSize: optional(union([nullType(), number()])),
  pageCount: optional(union([nullType(), number()])),
  total: optional(union([nullType(), number()])),
});
export type Pagination = Input<typeof PaginationSchema>;

export const MetaSchema = object({
  pagination: optional(union([nullType(), PaginationSchema])),
});
export type Meta = Input<typeof MetaSchema>;

export const SizesSchema = object({
  ext: optional(union([string(), nullType()])),
  url: optional(union([nullType(), string()])),
  hash: optional(union([string(), nullType()])),
  mime: optional(union([string(), nullType()])),
  name: optional(union([string(), nullType()])),
  path: optional(union([string(), nullType()])),
  size: optional(union([number(), nullType()])),
  width: optional(union([number(), nullType()])),
  height: optional(union([number(), nullType()])),
});
export type Large = Input<typeof SizesSchema>;

export const FormatsSchema = object({
  large: optional(union([SizesSchema, nullType()])),
  small: optional(union([SizesSchema, nullType()])),
  medium: optional(union([SizesSchema, nullType()])),
  thumbnail: optional(union([SizesSchema, nullType()])),
});
export type Formats = Input<typeof FormatsSchema>;

export const ProviderMetadataSchema = object({
  public_id: string(),
  resource_type: string(),
});

export type ProviderMetadata = Input<typeof ProviderMetadataSchema>;

export const ImageSchema = object({
  id: optional(union([number(), nullType()])),
  name: optional(union([string(), nullType()])),
  alternativeText: optional(union([string(), nullType()])),
  caption: optional(union([string(), nullType()])),
  width: optional(union([number(), nullType()])),
  height: optional(union([number(), nullType()])),
  formats: optional(union([FormatsSchema, nullType()])),
  hash: optional(union([string(), nullType()])),
  ext: optional(union([string(), nullType()])),
  mime: optional(union([string(), nullType()])),
  size: optional(union([number(), nullType()])),
  url: optional(union([string(), nullType()])),
  previewUrl: optional(union([string(), nullType()])),
  provider: optional(union([string(), nullType()])),
  provider_metadata: optional(union([ProviderMetadataSchema, nullType()])),
  createdAt: optional(union([coerce(string(), Date), nullType()])),
  updatedAt: optional(union([coerce(string(), Date), nullType()])),
  placeholder: optional(union([string(), nullType()])),
});
export type Cover = Input<typeof ImageSchema>;

export const MetaSocialSchema = object({
  id: optional(union([number(), nullType()])),
  socialNetwork: optional(union([nullType(), string()])),
  title: optional(union([nullType(), string()])),
  description: optional(union([nullType(), string()])),
});
export type MetaSocial = Input<typeof MetaSocialSchema>;

export const SeoSchema = object({
  id: optional(union([number(), nullType()])),
  metaTitle: optional(union([nullType(), string()])),
  metaDescription: optional(union([nullType(), string()])),
  keywords: optional(union([nullType(), string()])),
  metaRobots: optional(union([string(), nullType()])),
  structuredData: optional(union([string(), nullType()])),
  metaViewport: optional(union([string(), nullType()])),
  canonicalURL: optional(union([string(), nullType()])),
  metaImage: optional(union([ImageSchema, nullType()])),
  metaSocial: optional(union([array(MetaSocialSchema), nullType()])),
});
export type Seo = Input<typeof SeoSchema>;

export const LocaleSchema = enumType(["en", "ar"]);
export type Locale = Input<typeof LocaleSchema>;

export const ColorSchema = object({
  id: number(),
  color: string(),
});

export type Color = Input<typeof ColorSchema>;

export const SellerSchema = object({
  id: number(),
  name: string(),
  info: string(),
});

export type Seller = Input<typeof SellerSchema>;

export const SessionUserSchema = object({
  name: string(),
  email: string([email()]),
  image: string(),
  id: number(),
});

export type SessionUser = Input<typeof SessionUserSchema>;

export const SessionSchema = object({
  user: SessionUserSchema,
  jwt: string(),
});

export type Session = Input<typeof SessionSchema>;
