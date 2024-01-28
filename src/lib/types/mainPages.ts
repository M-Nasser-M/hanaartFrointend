import { Input, coerce, number, object, string } from "valibot";
import { MetaSchema, SeoSchema } from "./sharedTypes";

export const MainPageDataSchema = object({
  id: number(),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
  locale: string(),
  seo: SeoSchema,
});

export type MainPageData = Input<typeof MainPageDataSchema>;

export const BlogMainPageSchema = object({
  data: MainPageDataSchema,
  meta: MetaSchema,
});

export type BlogMainPage = Input<typeof BlogMainPageSchema>;

export const StoreMainPageSchema = object({
  data: MainPageDataSchema,
  meta: MetaSchema,
});

export type StoreMainPage = Input<typeof StoreMainPageSchema>;

export const HomePageDataSchema = object({
  id: number(),
  header: string(),
  subheader: string(),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
  locale: string(),
  seo: SeoSchema,
});

export type HomePageData = Input<typeof HomePageDataSchema>;

export const HomePageSchema = object({
  data: HomePageDataSchema,
  meta: MetaSchema,
});

export type MainPage = Input<typeof HomePageSchema>;
