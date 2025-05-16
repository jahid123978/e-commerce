"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { DashboardSidebar, SectionTitle } from "@/components";
import {
  convertCategoryNameToURLFriendly,
  formatCategoryName,
} from "@/utils/categoryFormating";

interface Product {
  id: number;
  title: string;
  slug: string;
  price: number;
  manufacturer: string;
  description: string;
  inStock: number;
  categoryId: string;
  mainImage: string;
}

interface Category {
  id: string;
  name: string;
}

interface OtherImage {
  imageID: string;
  image: string;
}

export default function DashboardProductDetails({
  params: { id },
}: {
  params: { id: string };
}) {
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [otherImages, setOtherImages] = useState<OtherImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to fetch JSON and throw on non-OK
  async function fetchJson<T>(url: string, opts?: RequestInit): Promise<T> {
    const res = await fetch(url, opts);
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.error || `Request failed: ${res.status}`);
    }
    return res.json();
  }

  // Load product, images, categories
  useEffect(() => {
    (async () => {
      try {
        const [prod, imgs, cats] = await Promise.all([
          fetchJson<Product>(`${apiBase}/api/products/${id}`),
          fetchJson<OtherImage[]>(`${apiBase}/api/images/${id}`),
          fetchJson<Category[]>(`${apiBase}/api/categories`),
        ]);
        setProduct(prod);
        setOtherImages(imgs);
        setCategories(cats);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Handle file upload
  const uploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("uploadedFile", file);
    try {
      const data = await fetchJson<{ filename: string }>(
        `${apiBase}/api/main-image`,
        { method: "POST", body: formData }
      );
      setProduct((p) => p && { ...p, mainImage: data.filename });
      toast.success("Image uploaded");
    } catch (err: any) {
      console.error(err);
      toast.error("Image upload failed");
    }
  };

  // Update product
  const saveProduct = async () => {
    if (!product) return;
    // Basic validation
    if (
      !product.title ||
      !product.slug ||
      Number.isNaN(product.price) ||
      !product.manufacturer ||
      !product.description
    ) {
      return toast.error("Please fill out all required fields");
    }

    setSaving(true);
    try {
      await fetchJson(`${apiBase}/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      toast.success("Product updated");
    } catch (err: any) {
      console.error(err);
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  // Delete product
  const deleteProduct = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetchJson(`${apiBase}/api/products/${id}`, { method: "DELETE" });
      toast.success("Product deleted");
      router.push("/admin/products");
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message.includes("foreign key")
          ? "Cannot delete: product is linked in orders"
          : "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-10">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12" />
      </div>
    );
  }
  if (error || !product) {
    return <p className="text-center text-red-500 py-10">{error || "Not found"}</p>;
  }

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <aside className="hidden xl:block w-64 bg-white border-r border-gray-200">
        <DashboardSidebar />
      </aside>
      <main className="flex-1 p-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Images */}
          <div className="space-y-6">
            <div className="relative w-full aspect-[4/3] bg-white rounded-lg shadow">
              <Image
                src={`/${product.mainImage}`}
                alt={product.title}
                fill
                className="object-contain p-4"
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && uploadFile(e.target.files[0])}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full
                         file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-500 file:text-white hover:file:bg-blue-600"
            />
            <div className="flex flex-wrap gap-4">
              {otherImages.map((img) => (
                <div key={img.imageID} className="w-24 h-24 bg-white rounded shadow overflow-hidden">
                  <Image
                    src={`/${img.image}`}
                    alt={`extra-${img.imageID}`}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="space-y-6">
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Title</span>
                <input
                  type="text"
                  value={product.title}
                  onChange={(e) => setProduct({ ...product, title: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Slug</span>
                <input
                  type="text"
                  value={convertCategoryNameToURLFriendly(product.slug)}
                  onChange={(e) =>
                    setProduct({ ...product, slug: convertCategoryNameToURLFriendly(e.target.value) })
                  }
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Price & Manufacturer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">Price</span>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: +e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Manufacturer</span>
                <input
                  type="text"
                  value={product.manufacturer}
                  onChange={(e) => setProduct({ ...product, manufacturer: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                />
              </label>
            </div>

            {/* Stock & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-gray-700">In Stock?</span>
                <select
                  value={product.inStock}
                  onChange={(e) => setProduct({ ...product, inStock: +e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
                </select>
              </label>
              <label className="block">
                <span className="text-gray-700">Category</span>
                <select
                  value={product.categoryId}
                  onChange={(e) => setProduct({ ...product, categoryId: e.target.value })}
                  className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {formatCategoryName(c.name)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* Description */}
            <label className="block">
              <span className="text-gray-700">Description</span>
              <textarea
                rows={4}
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500"
              />
            </label>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={saveProduct}
                disabled={saving}
                className="flex-1 bg-blue-600 text-white py-2 rounded shadow hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={deleteProduct}
                className="flex-1 bg-red-600 text-white py-2 rounded shadow hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
