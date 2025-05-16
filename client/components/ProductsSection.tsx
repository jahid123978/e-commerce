import React from "react";
import ProductsSlider from "./ProductsSlider";

const ProductsSection = async () => {
  // Server-side data fetching
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  const products = await res.json();

  return <ProductsSlider products={products} />;
};

export default ProductsSection;


// "use client";
// import React, { useRef, useState } from "react";
// import ProductItem from "./ProductItem";
// import Heading from "./Heading";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// const ProductsSection = async () => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isScrolled, setIsScrolled] = useState(false);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const { current: container } = scrollRef;
//       const scrollAmount = container.offsetWidth * 0.8;
//       container.scrollTo({
//         left: direction === 'right' 
//           ? container.scrollLeft + scrollAmount 
//           : container.scrollLeft - scrollAmount,
//         behavior: 'smooth'
//       });
//       setIsScrolled(true);
//     }
//   };
//   // sending API request for getting all products
//   const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
//   const products = await data.json();
//   return (
//     <section className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         <Heading title="Featured Products" />

//         <div className="relative group">
//           <div 
//             ref={scrollRef}
//             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-6 py-8 px-2"
//           >
//             {products.map((product:any) => (
//               <div 
//                 key={product.id} 
//                 className="min-w-[300px] sm:min-w-[320px] lg:min-w-[340px] snap-start"
//               >
//                 <ProductItem product={product} color="" />
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <div className="absolute inset-y-0 -left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <button 
//               onClick={() => scroll('left')}
//               className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <FiChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//           <div className="absolute inset-y-0 -right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <button 
//               onClick={() => scroll('right')}
//               className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <FiChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsSection;


// "use client"
// // ProductsSection Component
// import React, { useEffect, useRef, useState } from "react";
// import ProductItem from "./ProductItem";
// import Heading from "./Heading";
// import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
// const ProductsSection = async() => {
//   const scrollRef = useRef<HTMLDivElement>(null);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (scrollRef.current) {
//       const { current: container } = scrollRef;
//       const scrollAmount = container.offsetWidth * 0.8;
//       container.scrollTo({
//         left: direction === 'right' 
//           ? container.scrollLeft + scrollAmount 
//           : container.scrollLeft - scrollAmount,
//         behavior: 'smooth'
//       });
//       setIsScrolled(true);
//     }
//   };

//    useEffect(() => {
//     const abortController = new AbortController();
//     const { signal } = abortController;

//     const fetchProducts = async () => {
//       try {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
//           { signal }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         if (!signal.aborted) {
//           setError(err instanceof Error ? err.message : "Failed to fetch products");
//         }
//       } finally {
//         if (!signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchProducts();

//     return () => {
//       abortController.abort();
//     };
//   }, []); // Empty dependency array means this runs once on mount

//   if (loading) {
//     return <div><div className="text-center">
//     <div role="status">
//         <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
//             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
//         </svg>
//         <span className="sr-only">Loading Products...</span>
//     </div>
// </div></div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//   return (
//     <section className="relative bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <div className="max-w-7xl mx-auto">
//         <Heading title="Featured Products" />

//         <div className="relative group">
//           <div 
//             ref={scrollRef}
//             className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth gap-6 py-8 px-2"
//           >
//             {products.map((product:any) => (
//               <div 
//                 key={product.id} 
//                 className="min-w-[300px] sm:min-w-[320px] lg:min-w-[340px] snap-start"
//               >
//                 <ProductItem product={product} color="" />
//               </div>
//             ))}
//           </div>

//           {/* Navigation Arrows */}
//           <div className="absolute inset-y-0 -left-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <button 
//               onClick={() => scroll('left')}
//               className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <FiChevronLeft className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//           <div className="absolute inset-y-0 -right-4 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
//             <button 
//               onClick={() => scroll('right')}
//               className="p-3 bg-white shadow-lg rounded-full hover:bg-gray-100 transition-colors"
//             >
//               <FiChevronRight className="w-6 h-6 text-gray-700" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductsSection;