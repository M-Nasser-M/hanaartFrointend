import {
  Output,
  length,
  maxValue,
  minLength,
  minValue,
  number,
  object,
  regex,
  startsWith,
  string,
} from "valibot";

export const EditAddressFormSchema = object({
  firstname: string("First Name is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  lastname: string("Last Name is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  governorate: string("governorate is required"),
  street: string("Street is required", [
    minLength(3, "must be at least 3 charaters"),
  ]),
  building: string("building info is required"),
  floor: number("floor number is required", [minValue(0), maxValue(200)]),
  apartmentno: string("apartment number is required"),
  details: string("details is required"),
  phone: string("phone is required", [
    startsWith("0", "number should start with 0"),
    length(11, "you need 11 numbers"),
    regex(/^[0-9]+$/, "should be all numbers"),
  ]),
});

export type EditAddressForm = Output<typeof EditAddressFormSchema>;
