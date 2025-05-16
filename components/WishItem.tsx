"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "@/app/redux/store/slices/wishlistSlice";

interface wishItemStateTrackers {
  isWishItemDeleted: boolean;
  setIsWishItemDeleted: any;
}

const WishItem = ({
  id,
  title,
  price,
  image,
  slug,
  stockAvailabillity,
}: ProductInWishlist) => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const router = useRouter();
  const [userId, setUserId] = useState<string>();
 const apiBase = process.env.NEXT_PUBLIC_API_URL;
  const openProduct = (slug: string): void => {
    router.push(`/product/${slug}`);
  };

  const getUserByEmail = async (): Promise<void> => {
  if (!user?.email) {
    return; // nothing to do if there's no logged‑in user
  }
  const emailEncoded = encodeURIComponent(user.email);

  try {
    const res = await fetch(`${apiBase}/api/users/email/${emailEncoded}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user: ${res.status} ${res.statusText}`);
    }

    const data: { id: string } = await res.json();
    setUserId(data.id);
  } catch (err: any) {
    console.error("getUserByEmail error:", err);
    toast.error(err.message || "Unable to fetch user information");
  }
};

  const deleteItemFromWishlist = async (productId: string): Promise<void> => {
  if (!userId) {
    toast.error("You need to be logged in to perform this action");
    return;
  }
  const url = `${apiBase}/api/wishlist/${encodeURIComponent(userId)}/${encodeURIComponent(productId)}`;

  try {
    const res = await fetch(url, { method: "DELETE" });
    if (!res.ok) {
      // Attempt to parse a server‑sent error message
      const errorBody = await res.json().catch(() => null);
      const message = errorBody?.error || `Failed to remove item (status ${res.status})`;
      throw new Error(message);
    }

    // Update local state and notify user
    dispatch(removeFromWishlist(productId));
    toast.success("Item removed from your wishlist");
  } catch (err: any) {
    console.error("deleteItemFromWishlist error:", err);
    toast.error(err.message || "An error occurred while removing the item");
  }
};

  useEffect(() => {
    getUserByEmail();
  }, [user?.email]);

  return (
    <tr className="hover:bg-gray-100 cursor-pointer">
      <th
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {id}
      </th>
      <th>
        <div className="w-12 h-12 mx-auto" onClick={() => openProduct(slug)}>
          <Image
            src={`/${image}`}
            width={200}
            height={200}
            className="w-auto h-auto"
            alt={title}
          />
        </div>
      </th>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {title}
      </td>
      <td
        className="text-black text-sm text-center"
        onClick={() => openProduct(slug)}
      >
        {stockAvailabillity ? (
          <span className="text-success">In stock</span>
        ) : (
          <span className="text-error">Out of stock</span>
        )}
      </td>
      <td>
        <button className="btn btn-xs bg-blue-500 text-white hover:text-blue-500 border border-blue-500 hover:bg-white hover:text-blue-500 text-sm">
          <FaHeartCrack />
          <span
            className="max-sm:hidden"
            onClick={() => deleteItemFromWishlist(id)}
          >
            remove from the wishlist
          </span>
        </button>
      </td>
    </tr>
  );
};

export default WishItem;
