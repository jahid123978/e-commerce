// components/Pagination.jsx
"use client";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrementPage, incrementPage } from "@/app/redux/store/slices/paginationSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const page = useSelector((state: any) => state.pagination.page);
 function handleIncremeant(e: any) {
  e.preventDefault();
  dispatch(incrementPage());
 }
 function handleDecrement(e: any) {
  e.preventDefault();
  if (page > 1) {  
    dispatch(decrementPage());
  }
}
  return (
    <nav
      aria-label="Pagination"
      className="flex justify-center items-center space-x-3 py-8 font-sans"
    >
      {/* Previous Button */}
      <button
        onClick={(e)=>handleDecrement(e)}
        disabled={page === 1}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        &laquo; Prev
      </button>

      {/* Current Page Indicator */}
      <span className="px-5 py-2 bg-blue-600 text-white rounded-full font-medium">
        {page}
      </span>

      {/* Next Button */}
      <button
        onClick={(e)=>handleIncremeant(e)}
        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-100 transition"
      >
        Next &raquo;
      </button>
    </nav>
  );
};

export default Pagination;
