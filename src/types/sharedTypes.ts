import {
  Input,
  array,
  coerce,
  email,
  enumType,
  null_,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";

export const PaginationSchema = object({
  page: optional(union([null_(), number()])),
  pageSize: optional(union([null_(), number()])),
  pageCount: optional(union([null_(), number()])),
  total: optional(union([null_(), number()])),
});
export type Pagination = Input<typeof PaginationSchema>;

export const MetaSchema = object({
  pagination: optional(union([null_(), PaginationSchema])),
});
export type Meta = Input<typeof MetaSchema>;

export const SizesSchema = object({
  ext: optional(union([string(), null_()])),
  url: optional(union([null_(), string()])),
  hash: optional(union([string(), null_()])),
  mime: optional(union([string(), null_()])),
  name: optional(union([string(), null_()])),
  path: optional(union([string(), null_()])),
  size: optional(union([number(), null_()])),
  width: optional(union([number(), null_()])),
  height: optional(union([number(), null_()])),
});
export type Large = Input<typeof SizesSchema>;

export const FormatsSchema = object({
  large: optional(union([SizesSchema, null_()])),
  small: optional(union([SizesSchema, null_()])),
  medium: optional(union([SizesSchema, null_()])),
  thumbnail: optional(union([SizesSchema, null_()])),
});
export type Formats = Input<typeof FormatsSchema>;

export const ProviderMetadataSchema = object({
  public_id: string(),
  resource_type: string(),
});

export type ProviderMetadata = Input<typeof ProviderMetadataSchema>;

export const ImageSchema = object({
  id: optional(union([number(), null_()])),
  name: optional(union([string(), null_()])),
  alternativeText: optional(union([string(), null_()])),
  caption: optional(union([string(), null_()])),
  width: optional(union([number(), null_()])),
  height: optional(union([number(), null_()])),
  formats: optional(union([FormatsSchema, null_()])),
  hash: optional(union([string(), null_()])),
  ext: optional(union([string(), null_()])),
  mime: optional(union([string(), null_()])),
  size: optional(union([number(), null_()])),
  url: string(),
  previewUrl: optional(union([string(), null_()])),
  provider: optional(union([string(), null_()])),
  provider_metadata: optional(union([ProviderMetadataSchema, null_()])),
  createdAt: optional(union([coerce(string(), Date), null_()])),
  updatedAt: optional(union([coerce(string(), Date), null_()])),
  placeholder: string(),
});
export type Cover = Input<typeof ImageSchema>;

export const MetaSocialSchema = object({
  id: optional(union([number(), null_()])),
  socialNetwork: optional(union([null_(), string()])),
  title: optional(union([null_(), string()])),
  description: optional(union([null_(), string()])),
});
export type MetaSocial = Input<typeof MetaSocialSchema>;

export const SeoSchema = object({
  id: optional(union([number(), null_()])),
  metaTitle: optional(union([null_(), string()])),
  metaDescription: optional(union([null_(), string()])),
  keywords: optional(union([null_(), string()])),
  metaRobots: optional(union([string(), null_()])),
  structuredData: optional(union([string(), null_()])),
  metaViewport: optional(union([string(), null_()])),
  canonicalURL: optional(union([string(), null_()])),
  metaImage: optional(union([ImageSchema, null_()])),
  metaSocial: optional(union([array(MetaSocialSchema), null_()])),
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
