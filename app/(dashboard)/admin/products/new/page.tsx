// "use client";
// import { DashboardSidebar } from "@/components";
// import { convertCategoryNameToURLFriendly as convertSlugToURLFriendly } from "@/utils/categoryFormating";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const AddNewProduct = () => {
//   const [product, setProduct] = useState<{
//     title: string;
//     price: number;
//     manufacturer: string;
//     inStock: number;
//     mainImage: string;
//     description: string;
//     slug: string;
//     categoryId: string;
//   }>({
//     title: "",
//     price: 0,
//     manufacturer: "",
//     inStock: 1,
//     mainImage: "",
//     description: "",
//     slug: "",
//     categoryId: "",
//   });
//   const [categories, setCategories] = useState<Category[]>([]);

//   const addProduct = async () => {
//     if (
//       product.title === "" ||
//       product.manufacturer === "" ||
//       product.description == "" ||
//       product.slug === ""
//     ) {
//       toast.error("Please enter values in input fields");
//       return;
//     }

//     const requestOptions: any = {
//       method: "post",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(product),
//     };
//     fetch(`http://localhost:3001/api/products`, requestOptions)
//       .then((response) => {
//         if (response.status === 201) {
//           return response.json();
//         } else {
//           throw Error("There was an error while creating product");
//         }
//       })
//       .then((data) => {
//         toast.success("Product added successfully");
//         setProduct({
//           title: "",
//           price: 0,
//           manufacturer: "",
//           inStock: 1,
//           mainImage: "",
//           description: "",
//           slug: "",
//           categoryId: "",
//         });
//       })
//       .catch((error) => {
//         toast.error("There was an error while creating product");
//       });
//   };

//   const uploadFile = async (file: any) => {
//     const formData = new FormData();
//     formData.append("uploadedFile", file);

//     try {
//       const response = await fetch("http://localhost:3001/api/main-image", {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const data = await response.json();
//       } else {
//         console.error("File upload unsuccessfull");
//       }
//     } catch (error) {
//       console.error("Error happend while sending request:", error);
//     }
//   };

//   const fetchCategories = async () => {
//     fetch(`http://localhost:3001/api/categories`)
//       .then((res) => {
//         return res.json();
//       })
//       .then((data) => {
//         setCategories(data);
//         setProduct({
//           title: "",
//           price: 0,
//           manufacturer: "",
//           inStock: 1,
//           mainImage: "",
//           description: "",
//           slug: "",
//           categoryId: data[0]?.id,
//         });
//       });
//   };

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   return (
//     <div className="bg-white flex justify-start max-w-screen-2xl mx-auto xl:h-full max-xl:flex-col max-xl:gap-y-5">
//       <DashboardSidebar />
//       <div className="flex flex-col gap-y-7 xl:ml-5 max-xl:px-5 w-full">
//         <h1 className="text-3xl font-semibold">Add new product</h1>
//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Product name:</span>
//             </div>
//             <input
//               type="text"
//               className="input input-bordered w-full max-w-xs"
//               value={product?.title}
//               onChange={(e) =>
//                 setProduct({ ...product, title: e.target.value })
//               }
//             />
//           </label>
//         </div>

//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Product slug:</span>
//             </div>
//             <input
//               type="text"
//               className="input input-bordered w-full max-w-xs"
//               value={convertSlugToURLFriendly(product?.slug)}
//               onChange={(e) =>
//                 setProduct({
//                   ...product,
//                   slug: convertSlugToURLFriendly(e.target.value),
//                 })
//               }
//             />
//           </label>
//         </div>

//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Category:</span>
//             </div>
//             <select
//               className="select select-bordered"
//               value={product?.categoryId}
//               onChange={(e) =>
//                 setProduct({ ...product, categoryId: e.target.value })
//               }
//             >
//               {categories &&
//                 categories.map((category: any) => (
//                   <option key={category?.id} value={category?.id}>
//                     {category?.name}
//                   </option>
//                 ))}
//             </select>
//           </label>
//         </div>

//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Product price:</span>
//             </div>
//             <input
//               type="text"
//               className="input input-bordered w-full max-w-xs"
//               value={product?.price}
//               onChange={(e) =>
//                 setProduct({ ...product, price: Number(e.target.value) })
//               }
//             />
//           </label>
//         </div>
//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Manufacturer:</span>
//             </div>
//             <input
//               type="text"
//               className="input input-bordered w-full max-w-xs"
//               value={product?.manufacturer}
//               onChange={(e) =>
//                 setProduct({ ...product, manufacturer: e.target.value })
//               }
//             />
//           </label>
//         </div>
//         <div>
//           <label className="form-control w-full max-w-xs">
//             <div className="label">
//               <span className="label-text">Is product in stock?</span>
//             </div>
//             <select
//               className="select select-bordered"
//               value={product?.inStock}
//               onChange={(e) =>
//                 setProduct({ ...product, inStock: Number(e.target.value) })
//               }
//             >
//               <option value={1}>Yes</option>
//               <option value={0}>No</option>
//             </select>
//           </label>
//         </div>
//         <div>
//           <input
//             type="file"
//             className="file-input file-input-bordered file-input-lg w-full max-w-sm"
//             onChange={(e: any) => {
//               uploadFile(e.target.files[0]);
//               setProduct({ ...product, mainImage: e.target.files[0].name });
//             }}
//           />
//           {product?.mainImage && (
//             <Image
//               src={`/` + product?.mainImage}
//               alt={product?.title}
//               className="w-auto h-auto"
//               width={100}
//               height={100}
//             />
//           )}
//         </div>
//         <div>
//           <label className="form-control">
//             <div className="label">
//               <span className="label-text">Product description:</span>
//             </div>
//             <textarea
//               className="textarea textarea-bordered h-24"
//               value={product?.description}
//               onChange={(e) =>
//                 setProduct({ ...product, description: e.target.value })
//               }
//             ></textarea>
//           </label>
//         </div>
//         <div className="flex gap-x-2">
//           <button
//             onClick={addProduct}
//             type="button"
//             className="uppercase bg-blue-500 px-10 py-5 text-lg border border-black border-gray-300 font-bold text-white shadow-sm hover:bg-blue-600 hover:text-white focus:outline-none focus:ring-2"
//           >
//             Add product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddNewProduct;



"use client";
import { DashboardSidebar } from "@/components";
import { convertCategoryNameToURLFriendly } from "@/utils/categoryFormating";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiUploadCloud, FiPlusCircle } from "react-icons/fi";

const API_BASE ="http://localhost:3001/";

const apiClient = async <T,>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${url}`, options);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};
 interface ProductForm {
  title: string;
  price: number;
  manufacturer: string;
  inStock: number;
  mainImage: string;
  description: string;
  slug: string;
  categoryId: string;
}

interface Category {
  id: string;
  name: string;
}
const AddNewProduct = () => {
  const [product, setProduct] = useState<ProductForm>({
    title: "",
    price: 0,
    manufacturer: "",
    inStock: 1,
    mainImage: "",
    description: "",
    slug: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await validateForm();
      await apiClient("api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      
      toast.success("Product created successfully");
      resetForm();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create product");
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = async () => {
    const requiredFields: (keyof ProductForm)[] = [
      "title", "manufacturer", "description", "slug"
    ];

    for (const field of requiredFields) {
      if (!product[field]) throw new Error(`${field} is required`);
    }

    if (product.price <= 0) throw new Error("Price must be greater than 0");
    if (!product.categoryId) throw new Error("Category is required");
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);
    console.log("Uploading file:", file);
    try {
      const data = await apiClient<{ fileName: string }>("api/main-image", {
        method: "POST",
        body: formData,
      });
     console.log("Image upload response:", data);
      setProduct(p => ({ ...p, mainImage: data.fileName }));
      setImagePreview(URL.createObjectURL(file));
    } catch (error) {
      toast.error("Image upload failed");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiClient<Category[]>("api/categories");
      console.log("Fetched categories:", data);
      setCategories(data);
      setProduct(p => ({ ...p, categoryId: data[0]?.id || "" }));
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  const resetForm = () => {
    setProduct({
      title: "",
      price: 0,
      manufacturer: "",
      inStock: 1,
      mainImage: "",
      description: "",
      slug: "",
      categoryId: categories[0]?.id || "",
    });
    setImagePreview(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-600 mt-2">Fill in the details below to create a new product</p>
        </header>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Product Name"
              value={product.title}
              onChange={v => setProduct((p:any) => ({ ...p, title: v }))}
              required
            />

            <FormField
              label="Slug"
              value={convertCategoryNameToURLFriendly(product.slug)}
              onChange={(v: any) =>
                setProduct(p => ({
                  ...p,
                  slug: convertCategoryNameToURLFriendly(v)
                }))
              }
              required
            />

            <FormField
              label="Price"
              type="number"
              value={product.price.toString()}
              onChange={((v:any) => setProduct(p => ({
                ...p,
                price: Math.max(0, parseFloat(v))
              })))}
              step="0.01"
              required
            />

            <FormField
              label="Manufacturer"
              value={product.manufacturer}
              onChange={v => setProduct((p:any) => ({ ...p, manufacturer: v }))}
              required
            />

            <FormField
              label="Category"
              type="select"
              value={product.categoryId}
              onChange={v => setProduct((p:any) => ({ ...p, categoryId: v }))}
              options={categories.map(c => ({ value: c.id, label: c.name }))}
              required
            />

            <FormField
              label="Stock Status"
              type="select"
              value={product.inStock.toString()}
              onChange={((v:any) => setProduct(p => ({
                ...p,
                inStock: parseInt(v)
              })))}
              options={[
                { value: "1", label: "In Stock" },
                { value: "0", label: "Out of Stock" }
              ]}
            />
          </div>

          <ImageUploader 
            preview={imagePreview}
            onUpload={handleImageUpload}
            currentImage={product.mainImage}
          />

          <FormField
            label="Description"
            type="textarea"
            value={product.description}
            onChange={v => setProduct((p:any) => ({ ...p, description: v }))}
            required
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={resetForm}
              className="btn-secondary"
            >
              Reset Form
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Creating...</span>
              ) : (
                <>
                  <FiPlusCircle className="mr-2" />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// Sub-components
const FormField = ({ 
  label, 
  value, 
  onChange, 
  type = "text", 
  options, 
  required,
  ...props 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "number" | "select" | "textarea";
  options?: Array<{ value: string; label: string }>;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    {type === "textarea" ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field h-32"
        required={required}
        {...props}
      />
    ) : type === "select" ? (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field"
        required={required}
        {...props}
      >
        {options?.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field"
        required={required}
        {...props}
      />
    )}
  </div>
);

const ImageUploader = ({ preview, onUpload, currentImage }: {
  preview: string | null;
  onUpload: (file: File) => void;
  currentImage: string;
}) => (
  <div className="space-y-4">
    <label className="block text-sm font-medium text-gray-700">
      Product Image
    </label>
    
    <div className="flex items-center gap-4">
      <label className="
        relative cursor-pointer
        border-2 border-dashed border-gray-300
        rounded-lg p-6 w-64 h-64
        flex items-center justify-center
        hover:border-blue-500 transition-colors
      ">
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={e => e.target.files?.[0] && onUpload(e.target.files[0])}
        />
        {preview ? (
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain rounded-lg"
          />
        ) : currentImage ? (
          <Image
            src={`/${currentImage}`}
            alt="Current"
            fill
            className="object-contain rounded-lg"
          />
        ) : (
          <div className="text-center text-gray-500">
            <FiUploadCloud className="mx-auto text-2xl mb-2" />
            <span className="text-sm">Click to upload</span>
          </div>
        )}
      </label>
    </div>
  </div>
);

export default AddNewProduct;