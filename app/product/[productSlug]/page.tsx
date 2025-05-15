// // app/product/[productSlug]/page.tsx
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// import {
//   StockAvailabillity,
//   SingleProductRating,
//   ProductTabs,
//   SingleProductDynamicFields,
//   AddToWishlistBtn,
// } from "@/components";

// interface ImageItem {
//   imageID: string;
//   productID: string;
//   image: string;
// }

// export default async function SingleProductPage({
//   params,
// }: {
//   params: { productSlug: string };
// }) {
//   const apiBase = "http://localhost:3001";
//   // Helper to fetch and parse JSON, or throw
//   async function fetchJson(url: string) {
//     const res = await fetch(url, { cache: "no-store" });
//     if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
//     return res.json();
//   }

//   let product;
//   try {
//     product = await fetchJson(`${apiBase}/api/slugs/${encodeURIComponent(params.productSlug)}`);
//   } catch {
//     return notFound();
//   }

//   if (!product || product.error) {
//     return notFound();
//   }

//   let images: ImageItem[] = [];
//   try {
//     images = await fetchJson(`${apiBase}/api/images/${product.id}`);
//   } catch {
//     // If images endpoint fails, we continue with an empty array
//   }

//   return (
//     <div className="bg-gray-50 font-sans text-gray-800">
//   <div className="max-w-6xl mx-auto px-6 py-12">
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//       {/* Image Gallery */}
//       <div className="space-y-6">
//         <div className="relative w-full aspect-[4/3] bg-white rounded-xl overflow-hidden shadow">
//           <Image
//             src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
//             alt={product.title}
//             fill
//             className="object-contain p-6"
//           />
//         </div>
//         {images.length > 0 && (
//           <div className="flex space-x-4 overflow-x-auto">
//             {images.map((img) => (
//               <button
//                 key={img.imageID}
//                 className="flex-shrink-0 w-24 h-24 bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
//               >
//                 <Image
//                   src={`/${img.image}`}
//                   alt={`${product.title} thumbnail`}
//                   width={96}
//                   height={96}
//                   className="object-cover"
//                 />
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Product Details */}
//       <div className="space-y-8 flex flex-col justify-between">
//         {/* Header */}
//         <div className="space-y-4">
//           <h1 className="text-3xl md:text-4xl font-bold leading-tight">{product.title}</h1>
//           <div className="flex items-center space-x-3">
//             <SingleProductRating rating={product.rating} />
//             <span className="text-sm text-gray-600">({product.reviewsCount ?? 0} reviews)</span>
//           </div>
//           <p className="text-2xl font-semibold text-indigo-600">${product.price.toFixed(2)}</p>
//         </div>

//         {/* Availability & Specs */}
//         <div className="space-y-4">
//           <StockAvailabillity stock={product.stock} inStock={product.inStock} />
//           <SingleProductDynamicFields product={product} />
//         </div>

//         {/* Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
//           <AddToWishlistBtn product={product} slug={params.productSlug} />
//           <Link href={`/checkout?product=${product.id}`}>
//             <span className="w-full sm:w-auto text-center px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
//               Buy Now
//             </span>
//           </Link>
//         </div>

//         {/* Payment Icons */}
//         <div className="pt-4">
//           <p className="text-sm text-gray-500 mb-2">We accept:</p>
//           <div className="flex flex-wrap gap-4">
//             {["visa", "mastercard", "ae", "paypal", "dinersclub", "discover"].map((src) => (
//               <Image
//                 key={src}
//                 src={`/${src}.svg`}
//                 alt={`${src} logo`}
//                 width={40}
//                 height={40}
//                 className="object-contain"
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Product Tabs */}
//     <div className="mt-16">
//       <ProductTabs product={product} />
//     </div>
//   </div>
// </div>

//   );
// }



import {
  StockAvailabillity,
  UrgencyText,
  SingleProductRating,
  ProductTabs,
  SingleProductDynamicFields,
  AddToWishlistBtn,
} from "@/components";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquarePinterest } from "react-icons/fa6";

interface ImageItem {
  imageID: string;
  productID: string;
  image: string;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  // sending API request for a single product with a given product slug
  const data = await fetch(
    `http://localhost:3001/api/slugs/${params.productSlug}`
  );
  const product = await data.json();

  // sending API request for more than 1 product image if it exists
  const imagesData = await fetch(
    `http://localhost:3001/api/images/${product.id}`
  );
  const images = await imagesData.json();

  if (!product || product.error) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-center gap-x-16 pt-10 max-lg:flex-col items-center gap-y-5 px-5">
          <div>
            <Image
              src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
              width={500}
              height={500}
              alt="main image"
              className="w-auto h-auto"
            />
            <div className="flex justify-around mt-5 flex-wrap gap-y-1 max-[500px]:justify-center max-[500px]:gap-x-1">
              {images?.map((imageItem: ImageItem) => (
                <Image
                  key={imageItem.imageID}
                  src={`/${imageItem.image}`}
                  width={100}
                  height={100}
                  alt="laptop image"
                  className="w-auto h-auto"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-y-7 text-black max-[500px]:text-center">
            <SingleProductRating rating={product?.rating} />
            <h1 className="text-3xl">{product?.title}</h1>
            <p className="text-xl font-semibold">${product?.price}</p>
            <StockAvailabillity stock={94} inStock={product?.inStock} />
            <SingleProductDynamicFields product={product} />
            <div className="flex flex-col gap-y-2 max-[500px]:items-center">
              <AddToWishlistBtn product={product} slug={params.productSlug} />
              <p className="text-lg">
                SKU: <span className="ml-1">abccd-18</span>
              </p>
              <div className="text-lg flex gap-x-2">
                <span>Share:</span>
                <div className="flex items-center gap-x-1 text-2xl">
                  <FaSquareFacebook />
                  <FaSquareXTwitter />
                  <FaSquarePinterest />
                </div>
              </div>
              <div className="flex gap-x-2">
                <Image
                  src="/visa.svg"
                  width={50}
                  height={50}
                  alt="visa icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/mastercard.svg"
                  width={50}
                  height={50}
                  alt="mastercard icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/ae.svg"
                  width={50}
                  height={50}
                  alt="americal express icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/paypal.svg"
                  width={50}
                  height={50}
                  alt="paypal icon"
                  className="w-auto h-auto"
                />
                <Image
                  src="/dinersclub.svg"
                  width={50}
                  height={50}
                  alt="diners club icon"
                  className="h-auto w-auto"
                />
                <Image
                  src="/discover.svg"
                  width={50}
                  height={50}
                  alt="discover icon"
                  className="h-auto w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="py-16">
          <ProductTabs product={product} />
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;