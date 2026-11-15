"use client";

import { ui } from "../lib/strings";

/** A row of category buttons. Shared by the Events and Blog pages. */
export function CategoryFilter({
  categories,
  active,
  onChange,
  label,
}: {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
  label: string;
}) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {[ui.all, ...categories].map((c) => (
        <button key={c} type="button" className="chip" aria-pressed={c === active} onClick={() => onChange(c)}>
          {c}
        </button>
      ))}
    </div>
  );
}

export const uniqueCategories = (items: { category: string }[]) =>
  Array.from(new Set(items.map((i) => i.category))).sort();
