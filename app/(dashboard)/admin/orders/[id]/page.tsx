"use client";
import { DashboardSidebar } from "@/components";
import { isValidEmailAddressFormat, isValidNameOrLastname } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface OrderProduct {
  id: string;
  customerOrderId: string;
  productId: string;
  quantity: number;
  product: {
    id: string;
    slug: string;
    title: string;
    mainImage: string;
    price: number;
    rating: number;
    description: string;
    manufacturer: string;
    inStock: number;
    categoryId: string;
  };
}

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => (
  isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">{title}</h3>
        <p className="mb-6 text-gray-600">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="btn-danger"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  ) : null
);
const apiClient = async <T,>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, options);
  if (!response.ok) throw new Error(response.statusText);
  return response.json();
};

const AdminSingleOrder = () => {
   const [order, setOrder] = useState<Order>({
    id: "",
    adress: "",
    apartment: "",
    company: "",
    dateTime: "",
    email: "",
    lastname: "",
    name: "",
    phone: "",
    postalCode: "",
    city: "",
    country: "",
    orderNotice: "",
    status: "processing",
    total: 0,
  });
  const [orderProducts, setOrderProducts] = useState<OrderProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const params = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orderData, productsData] = await Promise.all([
          apiClient<Order>(`/api/orders/${params.id}`),
          apiClient<OrderProduct[]>(`/api/order-product/${params.id}`)
        ]);
        
        setOrder(orderData);
        setOrderProducts(productsData);
      } catch (error) {
        toast.error("Failed to load order details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.id]);

  const handleUpdate = async () => {
    if (!order) return;

    try {
      const validation = validateOrderFields(order);
      if (!validation.valid) {
        toast.error(validation.message);
        return;
      }

      await apiClient(`/api/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });

      toast.success("Order updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update order");
    }
  };

  const handleDelete = async () => {
    if (!order) return;

    try {
      await Promise.all([
        apiClient(`/api/order-product/${order.id}`, { method: "DELETE" }),
        apiClient(`/api/orders/${order.id}`, { method: "DELETE" })
      ]);

      toast.success("Order deleted successfully");
      router.push("/admin/orders");
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const validateOrderFields = (order: Order) => {
    if (!isValidNameOrLastname(order.name)) 
      return { valid: false, message: "Invalid name format" };
    if (!isValidNameOrLastname(order.lastname))
      return { valid: false, message: "Invalid lastname format" };
    if (!isValidEmailAddressFormat(order.email))
      return { valid: false, message: "Invalid email format" };
    return { valid: true, message: "" };
  };

  if (isLoading) return (<>
  <div className="relative items-center block max-w-sm p-6 bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white opacity-20">Customer Order details</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400 opacity-20">Customer Information manages</p>
    <div role="status" className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
        <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
        <span className="sr-only">Loading...</span>
    </div>
</div>
  </>);

  if (!order) return <div className="p-8 text-red-500">Order not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <DashboardSidebar />
      
      <main className="flex-1 p-8 max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.id}</h1>
          <p className="text-gray-500 mt-2">
            Last updated: {new Date(order.dateTime).toLocaleDateString()}
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Customer Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderFormField
              label="Name"
              value={order.name}
              onChange={v => setOrder({ ...order, name: v })}
            />
            <OrderFormField
              label="Lastname"
              value={order.lastname}
              onChange={v => setOrder({ ...order, lastname: v })}
            />
            <OrderFormField
              label="Email"
              type="email"
              value={order.email}
              onChange={v => setOrder({ ...order, email: v })}
            />
            <OrderFormField
              label="Phone"
              type="tel"
              value={order.phone}
              onChange={v => setOrder({ ...order, phone: v })}
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <OrderFormField
              label="Address"
              value={order.adress}
              onChange={v => setOrder({ ...order, adress: v })}
            />
            <OrderFormField
              label="Apartment/Suite"
              value={order.apartment}
              onChange={v => setOrder({ ...order, apartment: v })}
            />
            <OrderFormField
              label="City"
              value={order.city}
              onChange={v => setOrder({ ...order, city: v })}
            />
            <OrderFormField
              label="Country"
              value={order.country}
              onChange={v => setOrder({ ...order, country: v })}
            />
            <OrderFormField
              label="Postal Code"
              value={order.postalCode}
              onChange={v => setOrder({ ...order, postalCode: v })}
            />
            <OrderFormField
              label="Status"
              type="select"
              value={order.status}
              options={["processing", "delivered", "canceled"]}
              onChange={v => setOrder({ ...order, status: v as "processing" | "canceled" | "delivered" })}
            />
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-6">Order Items</h2>
          
          <div className="space-y-4">
            {orderProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>

          <OrderSummary total={order.total} />
        </section>

        <div className="flex gap-4 justify-end">
          <button
            onClick={handleUpdate}
            className="text-black"
          >
            <FiEdit className="mr-2" />
            Update Order
          </button>
          
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="btn-danger"
          >
            <FiTrash2 className="mr-2" />
            Delete Order
          </button>
        </div>
      </main>

      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Confirm Order Deletion"
        message="Are you sure you want to permanently delete this order?"
      />
    </div>
  );
};

// Sub-components
const OrderFormField = ({ label, value, onChange, type = "text", options }: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "tel" | "select";
  options?: string[];
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    {type === "select" ? (
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field"
      >
        {options?.map(option => (
          <option key={option} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input-field"
      />
    )}
  </div>
);

const ProductListItem = ({ product }: { product: any }) => (
  <div className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
    <Image
      src={product?.product?.mainImage ? `/${product?.product?.mainImage}` : "/product_placeholder.jpg"}
      alt={product.product.title}
      width={80}
      height={80}
      className="rounded-md object-cover"
    />
    <div className="ml-4 flex-1">
      <Link
        href={`/product/${product.product.slug}`}
        className="font-medium hover:text-blue-600"
      >
        {product.product.title}
      </Link>
      <div className="text-sm text-gray-500 mt-1">
        ${product.product.price} × {product.quantity} = $
        {(product.product.price * product.quantity).toFixed(2)}
      </div>
    </div>
  </div>
);

const OrderSummary = ({ total }: { total: number }) => {
  const tax = total * 0.2;
  const shipping = 5;
  const grandTotal = total + tax + shipping;

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div className="space-y-2 text-right">
        <div className="flex justify-between max-w-xs ml-auto">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between max-w-xs ml-auto">
          <span>Tax (20%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between max-w-xs ml-auto">
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between max-w-xs ml-auto font-semibold text-lg">
          <span>Total:</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

// Add LoadingSpinner and ConfirmationModal components
export default AdminSingleOrder;