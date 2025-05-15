// import { ProductItem, SectionTitle } from "@/components";
// import React from "react";

// interface Props {
//   searchParams: { search: string };
// }

// // sending api request for search results for a given search text
// const SearchPage = async ({ searchParams: { search } }: Props) => {
//   const data = await fetch(
//     `http://localhost:3001/api/search?query=${search || ""}`
//   );

//   const products = await data.json();

//   return (
//     <div>
//       <SectionTitle title="Search Page" path="Home | Search" />
//       <div className="max-w-screen-2xl mx-auto">
//         {search && (
//           <h3 className="text-4xl text-center py-10 max-sm:text-3xl">
//             Showing results for {search}
//           </h3>
//         )}
//         <div className="grid grid-cols-4 justify-items-center gap-x-2 gap-y-5 max-[1300px]:grid-cols-3 max-lg:grid-cols-2 max-[500px]:grid-cols-1">
//           {products.length > 0 ? (
//             products.map((product: Product) => (
//               <ProductItem key={product.id} product={product} color="black" />
//             ))
//           ) : (
//             <h3 className="text-3xl mt-5 text-center w-full col-span-full max-[1000px]:text-2xl max-[500px]:text-lg">
//               No products found for specified query
//             </h3>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

import { ProductItem, SectionTitle } from "@/components";
import React from "react";
import { Product } from "@prisma/client";
import { FiAlertCircle } from "react-icons/fi";

interface Props {
  searchParams: { search: string };
}

const SearchPage = async ({ searchParams: { search } }: Props) => {
  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/search?query=${encodeURIComponent(search || "")}`,
        { next: { revalidate: 60 } }
      );
      
      if (!response.ok) throw new Error("Failed to fetch results");
      return await response.json();
    } catch (error) {
      console.error("Search error:", error);
      return [];
    }
  };

  const products: Product[] = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <SectionTitle 
        title={search ? `Search Results for "${search}"` : "Product Search"} 
        path={search ? `Home / Search: ${search}` : "Home / Search"}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product:any) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    color="gray"
                  />
                ))}
              </div>
              
              {/* <div className="flex justify-center mt-8">
                <Pagination 
                  currentPage={1} 
                  totalPages={5} 
                  onPageChange={() => {}}
                />
              </div> */}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4 text-center">
              <FiAlertCircle className="w-16 h-16 text-gray-400" />
              <h2 className="text-2xl font-semibold text-gray-900">
                No products found
              </h2>
              <p className="text-gray-600 max-w-md">
                {search ? (
                  <>
                    We could not find any results for <span className="font-medium">{search}</span>. 
                    Try checking your spelling or using more general terms.
                  </>
                ) : (
                  "Please enter a search term to find products"
                )}
              </p>
              <a
                href="/"
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
