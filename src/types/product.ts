import {
  Input,
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
  details: optional(union([null_(), string()])),
  offer_price: optional(union([null_(), number()])),
  availableStock: string(),
  onholdStock: optional(union([null_(), string()])),
  soldStock: optional(union([null_(), string()])),
  createdAt: coerce(string(), Date),
  updatedAt: coerce(string(), Date),
  publishedAt: coerce(string(), Date),
  locale: LocaleSchema,
  category: optional(union([null_(), string()])),
  slug: string(),
  images: optional(union([null_(), array(ImageSchema)])),
  cover: ImageSchema,
  colors: optional(union([null_(), ColorSchema])),
  seller: optional(union([null_(), SellerSchema])),
  seo: optional(union([null_(), SeoSchema])),
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
  sort: optional(union([null_(), array(string())])), //Sort search results by an attribute's value
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
  offer_price: union([null_(), number()]),
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
  totalPages: number(),
  totalHits: number(),
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

export const filterDefaultCheckStatus = [
  ...Object.values(SubCategory),
  ...Object.values(Category),
].reduce(
  (obj, key) => {
    const filter = Object.values(Category).includes(key as any)
      ? `category = '${key}'`
      : `subcategory = '${key}'`;
    return {
      ...obj,
      [key]: { checked: false, filter },
    };
  },
  {} as Record<SubCategory | Category, { checked: boolean; filter: string }>
);

function createCategory(key: Category, subCategories: SubCategory[] = []) {
  return {
    key,
    subCategories: subCategories.map((subKey) => ({ key: subKey })),
  };
}

export const categories = [
  createCategory(Category.Art_Supplies, [
    SubCategory.Pens_Pencils_and_Paints,
    SubCategory.Brushes_and_Tools,
    SubCategory.Canvas_and_Sketchbooks,
  ]),
  createCategory(Category.Hobbies, [
    SubCategory.Diamond_Painting,
    SubCategory.Coloring_Books,
    SubCategory.Puzzles,
  ]),
  createCategory(Category.Art_Journaling, [
    SubCategory.Washi_Tapes_and_Stickers,
    SubCategory.Paper_Packs_and_Ephemra,
    SubCategory.Wax_Boxes_and_Tools,
  ]),
  createCategory(Category.Handmade_Gifts),
  createCategory(Category.Clearance),
] as const;

export const defaultAttributesToRetrieve = [
  "name",
  "price",
  "description",
  "offer_price",
  "availableStock",
  "slug",
  "cover",
];

export const defaultPageSize = 9;
