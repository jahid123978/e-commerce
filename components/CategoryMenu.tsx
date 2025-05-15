
import React from "react";
import CategoryItem from "./CategoryItem";
import Image from "next/image";
import { categoryMenuList } from "@/lib/utils";
import Heading from "./Heading";

const CategoryMenu = () => {
  return (
    <section className="py-16 bg-gray-100">
      <Heading title="Search Categories"/>

      <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-8">
        {categoryMenuList.map((item) => (
          <a
            href={item.href}
            key={item.id}
            className="
              group
              bg-white
              rounded-2xl
              shadow-md
              p-6
              flex flex-col items-center
              transform transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl
            "
          >
            <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-full mb-4 transition-colors duration-300 group-hover:bg-indigo-100">
              <Image src={item.src} width={32} height={32} alt={item.title} />
            </div>
            <span className="text-gray-700 font-medium text-center">
              {item.title}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;
