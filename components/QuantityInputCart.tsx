
"use client";
import { calculateTotals, ProductInCart, updateCartAmount } from "@/app/redux/store/slices/cartSlice";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const QuantityInputCart = ({ product } : { product: ProductInCart }) => {
  const dispatch = useDispatch();
  const [quantityCount, setQuantityCount] = useState<number>(product.amount);

  const handleQuantityChange = (actionName: string): void => {
    if (actionName === "plus") {
      setQuantityCount(() => quantityCount + 1);
      dispatch(updateCartAmount({ id: product.id, amount: quantityCount + 1 }));
      dispatch(calculateTotals());

      
    } else if (actionName === "minus" && quantityCount !== 1) {
      setQuantityCount(() => quantityCount - 1);
      dispatch(updateCartAmount({ id: product.id, amount: quantityCount - 1 }));
      dispatch(calculateTotals());
    }
  };

  return (
    <div>
      <label htmlFor="Quantity" className="sr-only">
        {" "}
        Quantity{" "}
      </label>

      <div className="flex items-center justify-center rounded border border-gray-200 w-32">
        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("minus")}
        >
          <FaMinus />
        </button>

        <input
          type="number"
          id="Quantity"
          disabled={true}
          value={quantityCount}
          className="h-10 w-16 border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          type="button"
          className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex items-center justify-center"
          onClick={() => handleQuantityChange("plus")}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default QuantityInputCart;
