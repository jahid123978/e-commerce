
"use client";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart, calculateTotals } from "@/app/redux/store/slices/cartSlice";

const AddToCartSingleProductBtn = ({ product, quantityCount } : SingleProductBtnProps) => {
  
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product?.id.toString(),
      title: product?.title,
      price: product?.price,
      image: product?.mainImage,
      amount: quantityCount
    }));
    dispatch(calculateTotals());
    toast.success("Product added to the cart");
  };
  return (
    <button
      onClick={handleAddToCart}
      className="btn w-[200px] text-lg border border-gray-300 border-1 font-normal bg-white text-blue-500 hover:bg-blue-500 hover:text-white hover:border-blue-500 hover:scale-110 transition-all uppercase ease-in max-[500px]:w-full"
    >
      Add to cart
    </button>
  );
};

export default AddToCartSingleProductBtn;
