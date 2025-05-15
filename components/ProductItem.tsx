"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import ProductItemRating from "./ProductItemRating";

const ProductItem = ({
  product,
  color,
}: {
  product: Product;
  color: string;
}) => {
  return (
     <div className="bg-white w-72 font-sans rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/product/${product.slug}`}>
        <span className="relative block w-full h-0 pb-[75%]">
          <Image
            src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="hover:scale-105 transform transition-transform duration-300"
          />
        </span>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/product/${product.slug}`}> 
          <span className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors">
            {product.title}
          </span>
        </Link>
        <p className="mt-2 text-gray-600 flex-1">
          {product.description?.slice(0, 80) || "No description"}...
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
           <Link href={`/product/${product.slug}`}>
          <button className="w-24 text-sm font-inter px-3 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-md hover:from-blue-600 hover:to-indigo-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400">
            View 
          </button>
          </Link>
        </div>

        <div className="mt-3">
          <ProductItemRating productRating={product.rating} />
        </div>
      </div>
    </div>
  );
};

export default ProductItem;


// 'use client';
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import Link from "next/link";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// import ProductItemRating from "./ProductItemRating";
// import { FaHeartCircleExclamation } from "react-icons/fa6";

// // ProductItem Component
// const ProductItem = ({ product, color }: { product: Product; color: string }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   console.log(product);
//   return (
//     <div 
//       className="relative bg-white rounded-xl shadow-sm hover:shadow-1xl transition-all duration-300 group overflow-hidden"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Sale Badge */}
     
//         <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
//           20% OFF
//         </div>
      

//       <Link href={`/product/${product.slug}`} className="block relative overflow-hidden">
//         <div className="relative aspect-square h-60 w-96">
//           <Image
//             src={product.mainImage? `/${product.mainImage}` : "/product_placeholder.jpg"}
//             alt={product.title}
//             fill
//             className={`object-cover transition-transform duration-500 ${
//               isHovered ? 'scale-105' : 'scale-100'
//             }`}
//           />
//           {/* Quick View Overlay */}
//           <div className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
//             isHovered ? 'opacity-100' : 'opacity-0'
//           }`}>
//             <button className="px-6 py-2 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors">
//               Quick View
//             </button>
//           </div>
//         </div>
//       </Link>

//       <div className="p-5">
//         <div className="mb-3">
//           <span className="text-sm text-gray-500">{product?.category?.name}</span>
//           <Link href={`/product/${product.slug}`} className="block mt-1">
//             <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2">
//               {product.title}
//             </h3>
//           </Link>
//         </div>

//         <div className="flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <span className="text-xl font-bold text-blue-600">
//               ${product.price.toFixed(2)}
//             </span>
            
//               <span className="text-sm text-gray-400 line-through">
//                 ${product.price+10}
//               </span>
          
//           </div>
//           <ProductItemRating productRating={product.rating} />
//         </div>

//         <div className="mt-4 flex justify-between items-center">
//           <button className="w-40 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-small">
//             Add to Cart
//           </button>
//           <button className="ml-2 p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
//             <FaHeartCircleExclamation className="w-5 h-5 text-gray-600" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ProductItem;