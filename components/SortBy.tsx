"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSortBy } from "@/app/redux/store/slices/sortSlice";

const SortBy = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state: any) => state.sort.sortBy);
  function handleChangeSortBy(e: any) {
    e.preventDefault();
    dispatch(changeSortBy(e.target.value));
  }
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-3 lg:gap-6 font-sans">
      <label htmlFor="sort-select" className="text-lg text-gray-700 font-medium">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => handleChangeSortBy(e)}
        className="
          w-full lg:w-48
          px-4 py-2
          bg-white
          border border-gray-300 rounded-md
          text-gray-800 text-base
          focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
          transition
        "
      >
        <option value="defaultSort">Default</option>
        <option value="titleAsc">Title: A → Z</option>
        <option value="titleDesc">Title: Z → A</option>
        <option value="lowPrice">Price: Low → High</option>
        <option value="highPrice">Price: High → Low</option>
      </select>
    </div>
  );
};

export default SortBy;
