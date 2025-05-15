"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { HiSearch } from "react-icons/hi"
const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  // function for modifying URL for searching products
  // After it we will grab URL on the search page and send GET request for searched products
  const searchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/search?search=${searchInput}`);
    setSearchInput("");
  };

  return (
<form
      onSubmit={searchProducts}
      className="w-full flex items-center bg-white border border-gray-200 rounded-full overflow-hidden transition-all focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500"
    >
      <div className="pl-4 pr-2 text-gray-400">
        <HiSearch className="w-5 h-5" />
      </div>
      <input
        className="flex-1 py-2.5 pr-4 border-0 focus:ring-0 text-sm placeholder-gray-400"
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors text-sm"
      >
        Search
      </button>
    </form>

  );
};

export default SearchInput;
