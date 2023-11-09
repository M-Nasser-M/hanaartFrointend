import {
  Output,
  array,
  coerce,
  null_,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import {
  ImageSchema,
  LocaleSchema,
  MetaSchema,
  SeoSchema,
} from "./sharedTypes";

export const BlogDataSchema = object({
  id: number(),
  title: string(),
  description: string(),
  article: string(),
  cover: ImageSchema,
  seo: optional(union([null_(), SeoSchema])),
  slug: string(),
  categories: union([null_(), string()]),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
  locale: LocaleSchema,
});

export type BlogData = Output<typeof BlogDataSchema>;

export const blogsSchema = object({
  data: array(BlogDataSchema),
  meta: MetaSchema,
});

export type Blogs = Output<typeof blogsSchema>;

export const blogSchema = object({
  data: BlogDataSchema,
  meta: MetaSchema,
});

export type Blog = Output<typeof blogSchema>;
