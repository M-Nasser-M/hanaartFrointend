import {
  Output,
  array,
  coerce,
  number,
  object,
  optional,
  string,
  union,
} from "valibot";
import { ImageSchema, PaginationSchema } from "./sharedTypes";

export const SubCategorySchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
});

export type Subcategory = Output<typeof SubCategorySchema>;

export const CategorySchema = object({
  id: number(),
  name_en: string(),
  name_ar: string(),
  cover: optional(ImageSchema),
  subcategories: optional(
    union([array(SubCategorySchema), array(SubCategorySchema)])
  ),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
});

export type Category = Output<typeof CategorySchema>;

export const CategoriesSchema = object({
  data: array(CategorySchema),
  meta: PaginationSchema,
});

export type Categories = Output<typeof CategoriesSchema>;

export const SubCategoriesSchema = object({
  data: array(SubCategorySchema),
  meta: PaginationSchema,
});

export type SubCategories = Output<typeof SubCategoriesSchema>;
