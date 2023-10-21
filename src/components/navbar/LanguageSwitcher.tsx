"use client";

import { Select } from "@radix-ui/themes";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const router = useRouter();
  const currentPathname = usePathname();
  const currentLocale = useLocale();

  const handleChange = (value: string) => {
    const newLocale = value;

    router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));

    router.refresh();
  };

  return (
    <Select.Root value={currentLocale} onValueChange={handleChange}>
      <Select.Trigger placeholder="Select Lang" />
      <Select.Content>
        <Select.Group>
          <Select.Label>Language</Select.Label>
          <Select.Item value="en">English</Select.Item>
          <Select.Item value="ar">Arabic</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
