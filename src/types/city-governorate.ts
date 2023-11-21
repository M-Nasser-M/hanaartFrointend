import { Output, array, coerce, object, string } from "valibot";

export const GovernorateSchema = object({
  id: coerce(string(), Number),
  governorate_name_ar: string(),
  governorate_name_en: string(),
});

export type Governorate = Output<typeof GovernorateSchema>;

export const GovernoratesSchema = array(GovernorateSchema);

export type Governorates = Output<typeof GovernoratesSchema>;

export const citySchema = object({
  id: coerce(string(), Number),
  governorate_id: coerce(string(), Number),
  city_name_ar: string(),
  city_name_en: string(),
});

export type City = Output<typeof citySchema>;

export const citiesSchema = array(citySchema);

export type Cities = Output<typeof citiesSchema>;
