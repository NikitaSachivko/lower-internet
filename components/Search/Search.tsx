"use client";

import type { MenuTriggerAction } from "@heroui/react";
import pagesData from "../../config/pages-data.json";
import React from "react";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [items, setItems] = React.useState<AutocompleteItemData[]>([]);
  const router = useRouter();

  type AutocompleteItemData = {
    key: string;
    label: string;
    description?: string;
  };

  // 🔍 Функция поиска по pages-data.json
  function searchPagesData(query: string): AutocompleteItemData[] {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return [];

    const results: AutocompleteItemData[] = [];

    for (const group of pagesData) {
      const groupMatch = group.title.toLowerCase().includes(lowerQuery);
      if (groupMatch) {
        results.push({
          key: `group-${group.slug}`,
          label: group.title,
          description: "Группа",
          slug: group.slug, // ← добавляем slug группы
        });
      }

      for (const item of group.items) {
        const inTitle = item.title?.toLowerCase().includes(lowerQuery);
        const inTags = item.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerQuery)
        );

        if (inTitle || inTags) {
          results.push({
            key: item.href,
            label: item.title,
            description: item.channelName || "",
            slug: item.slug || group.slug, // ← используем item.slug если есть, иначе fallback на group.slug
          });
        }
      }
    }

    return results;
  }

  // 🚀 Обработчик изменения ввода
  const onInputChange = (value: string) => {
    setInputValue(value);
    setItems(searchPagesData(value));
  };

  const onSelectionChange = (key: React.Key | null) => {
    const selected = items.find((item) => item.key === key);
    if (selected?.slug) {
      setInputValue(selected.label);
      router.push(
        `/person/${selected.slug}?search=${encodeURIComponent(selected.label)}`
      );
    }
  };

  const onOpenChange = (isOpen: boolean, trigger: MenuTriggerAction) => {
    if (isOpen && trigger === "manual") {
      setItems([]);
    }
  };

  return (
    <Autocomplete
      className="max-w-xl"
      inputValue={inputValue}
      items={items}
      label="Поиск по авторам и тегам"
      placeholder="Начните вводить имя или тег"
      selectedKey={null}
      variant="bordered"
      onInputChange={onInputChange}
      onOpenChange={onOpenChange}
      onSelectionChange={onSelectionChange}
    >
      {(item) => (
        <AutocompleteItem key={item.key} textValue={item.label}>
          <div className="flex flex-col">
            <span>{item.label}</span>
            {item.description && (
              <span className="text-xs text-gray-500">{item.description}</span>
            )}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
