import {
  Input,
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
  offer_price: optional(union([nullType(), number()])),
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

export const ProductSearchRequestBodySchema = object({
  q: string(), //Query string
  filter: optional(array(string())), //Filter queries by an attribute's value
  sort: optional(array(string())), //Sort search results by an attribute's value
  attributesToRetrieve: optional(array(string())), //Attributes to display in the returned documents
  offset: optional(number()), //Number of documents to skip
  limit: optional(number()), //Maximum number of documents returned
  hitsPerPage: optional(number()), //Maximum number of documents returned for a page
  page: optional(number()), //Request a specific page of results
});

export type ProductSearchRequestBody = Input<
  typeof ProductSearchRequestBodySchema
>;

export const ProductSearchResponseElementSchema = object({
  name: string(),
  price: number(),
  description: string(),
  offer_price: union([nullType(), number()]),
  availableStock: string(),
  slug: string(),
  cover: ImageSchema,
});

export type ProductSearchResponseElement = Output<
  typeof ProductSearchResponseElementSchema
>;

export const ProductSearchResponseSchema = object({
  hits: union([
    array(ProductSearchResponseElementSchema),
    array(ProductSearchResponseElementSchema),
  ]),
  query: string(),
  processingTimeMs: optional(number()),
  limit: optional(number()),
  offset: optional(number()),
  estimatedTotalHits: optional(number()),
});

export type ProductSearchResponse = Input<typeof ProductSearchResponseSchema>;

export enum Category {
  Art_Supplies = "Art Supplies",
  Hobbies = "Hobbies",
  Art_Journaling = "Art Journaling",
  Handmade_Gifts = "Handmade Gifts",
  Clearance = "Clearance",
}

export enum SubCategory {
  Pens_Pencils_and_Paints = "Pens Pencils and Paints",
  Brushes_and_Tools = "Brushes and Tools",
  Canvas_and_Sketchbooks = "Canvas and Sketchbooks",
  Diamond_Painting = "Diamond Painting",
  Coloring_Books = "Coloring Books",
  Puzzles = "Puzzles",
  Washi_Tapes_and_Stickers = "Washi Tapes and Stickers",
  Paper_Packs_and_Ephemra = "Paper Packs and Ephemra",
  Wax_Boxes_and_Tools = "Wax Boxes and Tools",
}

export const categories = [
  {
    key: Category.Art_Supplies,
    subCategories: [
      { key: SubCategory.Pens_Pencils_and_Paints },
      { key: SubCategory.Brushes_and_Tools },
      { key: SubCategory.Canvas_and_Sketchbooks },
    ],
  },
  {
    key: Category.Hobbies,
    subCategories: [
      { key: SubCategory.Diamond_Painting },
      { key: SubCategory.Coloring_Books },
      { key: SubCategory.Puzzles },
    ],
  },
  {
    key: Category.Art_Journaling,
    subCategories: [
      { key: SubCategory.Washi_Tapes_and_Stickers },
      { key: SubCategory.Paper_Packs_and_Ephemra },
      { key: SubCategory.Wax_Boxes_and_Tools },
    ],
  },
  { key: Category.Handmade_Gifts, subCategories: [] },
  { key: Category.Clearance, subCategories: [] },
] as const;

export type CategoriesKeys = keyof typeof categories;
