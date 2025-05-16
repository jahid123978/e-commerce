"use client";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface InputCategory {
  inStock: { text: string; isChecked: boolean };
  outOfStock: { text: string; isChecked: boolean };
  priceFilter: { text: string; value: number };
  ratingFilter: { text: string; value: number };
}

const Filters = () => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const sortBy = useSelector((state: any) => state.sort.sortBy);
  const page = useSelector((state: any) => state.pagination.page);

  const [inputCategory, setInputCategory] = useState<InputCategory>({
    inStock: { text: "instock", isChecked: true },
    outOfStock: { text: "outofstock", isChecked: true },
    priceFilter: { text: "price", value: 1000 },
    ratingFilter: { text: "rating", value: 0 },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("inStock", inputCategory.inStock.isChecked.toString());
    params.set("outOfStock", inputCategory.outOfStock.isChecked.toString());
    params.set("price", inputCategory.priceFilter.value.toString());
    params.set("rating", inputCategory.ratingFilter.value.toString());
    params.set("sort", sortBy);
    params.set("page", page.toString());
    replace(`${pathname}?${params}`);
  }, [inputCategory, sortBy, page, pathname, replace]);

  return (
    <aside className="rounded-2xl pt-6 font-sans">
      <h2 className="text-2xl font-medium text-gray-800">Filters</h2>
      <div className="border-t border-gray-200 mt-4 mb-6" />

      {/* Availability */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-700">Availability</h3>
        {(["inStock", "outOfStock"] as const).map((key) => {
          const label = key === "inStock" ? "In Stock" : "Out of Stock";
          const checked = inputCategory[key].isChecked;
          return (
            <label
              key={key}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={checked}
                onChange={() =>
                  setInputCategory({
                    ...inputCategory,
                    [key]: {
                      ...inputCategory[key],
                      isChecked: !checked,
                    },
                  })
                }
                className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-0"
              />
              <span className="text-gray-700 text-base">{label}</span>
            </label>
          );
        })}
      </div>
      <div className="border-t border-gray-200 mt-6 mb-6" />

      {/* Price Range */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-700">Max Price</h3>
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={3000}
            step={10}
            value={inputCategory.priceFilter.value}
            onChange={(e) =>
              setInputCategory({
                ...inputCategory,
                priceFilter: {
                  text: "price",
                  value: Number(e.target.value),
                },
              })
            }
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="text-right text-gray-600 text-base">
            ${inputCategory.priceFilter.value}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 mt-6 mb-6" />

      {/* Rating Range */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-gray-700">Min Rating</h3>
        <div className="space-y-1">
          <input
            type="range"
            min={0}
            max={5}
            step={1}
            value={inputCategory.ratingFilter.value}
            onChange={(e) =>
              setInputCategory({
                ...inputCategory,
                ratingFilter: {
                  text: "rating",
                  value: Number(e.target.value),
                },
              })
            }
            className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-sm text-gray-500">
            {[0, 1, 2, 3, 4, 5].map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Filters;