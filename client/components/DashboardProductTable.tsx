"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegEye } from "react-icons/fa";
const DashboardProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const apiBase = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${apiBase}/api/products?mode=admin`,
          { cache: "no-store" }
        );
        
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load products");
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-red-600 text-lg">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Product Inventory</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add New Product
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
    <div role="status">
        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
        </svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product:any) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        <Image
                            width={48}
                            height={48}
                            src={product?.mainImage ? `/${product?.mainImage}` : "/product_placeholder.jpg"}
                            alt="Avatar Tailwind CSS Component"
                            className="w-auto h-auto"
                          />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{product.title}</div>
                        <div className="text-sm text-gray-500">{product.manufacturer}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                    ${product.price.toFixed(2)}
                  </td>
                  <td className="ml-4 px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    <div className="group relative flex items-center">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <FaRegEye className="w-5 h-5" />
                      </Link>
                      <span className="opacity-0 group-hover:opacity-100 transition bg-gray-900 text-white px-2 py-1 rounded text-xs absolute left-1/2 -translate-x-1/2 top-8 z-10 whitespace-nowrap">
                        View Details
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Heroicons components
const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

export default DashboardProductTable;