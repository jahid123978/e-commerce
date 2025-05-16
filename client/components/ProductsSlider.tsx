"use client";
import React, { useRef, useState } from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface ProductsSliderProps {
  products: any[]; // Replace 'any' with your Product type
}

const ProductsSlider = ({ products }: ProductsSliderProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current: container } = scrollRef;
      const scrollAmount = container.offsetWidth * 0.8;
      container.scrollTo({
        left: direction === 'right' 
          ? container.scrollLeft + scrollAmount 
          : container.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
      setIsScrolled(true);
    }
  };

  return (
    <section className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Heading title="Featured Products" />

        <div className="relative group">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-6 py-8 px-2"
          >
            {products.map((product) => (
              <div 
                key={product.id} 
                className="min-w-[300px] sm:min-w-[320px] lg:min-w-[340px] snap-start"
              >
                <ProductItem product={product} color="" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="absolute inset-y-0 -left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => scroll('left')}
              className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          <div className="absolute inset-y-0 -right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => scroll('right')}
              className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSlider;