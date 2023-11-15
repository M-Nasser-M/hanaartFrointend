import type { getTranslations } from "next-intl/server";

export const getTranslationObject = async <T extends typeof getTranslations>(
  t: T,
  namespace: NamespaceKeys
) => {
  const translations = await t(namespace);

  const namespaceObject = (await import("../../messages/en.json"))[namespace];
  const namespaceObjectKeys = Object.keys(
    namespaceObject
  ) as (keyof typeof namespaceObject)[];
  const translationsObject = namespaceObjectKeys.reduce((prev, curr) => {
    return {
      ...prev,
      [curr as string]: translations(curr),
    };
  }, {});
  return translationsObject;
};
