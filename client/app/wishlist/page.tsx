"use client";
import { SectionTitle, WishItem } from "@/components";
import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../redux/store/slices/wishlistSlice";
import toast from "react-hot-toast";



const WishlistPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  async function getWishlistByUserId(userId: string): Promise<void> {

  // 1. Fetch raw wishlist entries
  const res = await fetch(`${apiBase}/api/wishlist/${encodeURIComponent(userId)}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch wishlist: ${res.status} ${res.statusText}`);
  }
  const rawList: Array<{ product: any }> = await res.json();

  // 2. Transform entries into your UI model
  const wishlistItems = rawList.map(({ product }) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.mainImage,
    slug: product.slug,
    stockAvailabillity: product.inStock,
  }));

  // 3. Dispatch to Redux
  dispatch(setWishlist(wishlistItems));
}
 async function getUserByEmail(): Promise<any> {
  if (!user?.email) return ("Login to see your wishlist");

  try {
    // 1. Fetch the user object by email
    const userRes = await fetch(`${apiBase}/api/users/email/${encodeURIComponent(user?.email)}`, {
      cache: "no-store",
    });
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user: ${userRes.status} ${userRes.statusText}`);
    }
    const userData: { id: string; name: string; email: string; role: string } = await userRes.json();

    // 2. Load the wishlist for that user
    await getWishlistByUserId(userData.id);
  } catch (err: any) {
    console.error("getUserByEmail error:", err);
    toast.error(err.message || "Unable to load user data");
  }
};

  useEffect(() => {
    getUserByEmail();
  }, [user?.email, wishlist.length]);
  
  return (
    <div className="bg-white">
      <SectionTitle title="Wishlist" path="Home | Wishlist" />
      {wishlist && wishlist.length === 0 ? (
        <h3 className="text-center text-4xl py-10 text-black max-lg:text-3xl max-sm:text-2xl max-sm:pt-5 max-[400px]:text-xl">
          No items found in the wishlist
        </h3>
      ) : (
        <div className="max-w-screen-2xl mx-auto">
          <div className="overflow-x-auto">
            <table className="table text-center">
              <thead>
                <tr>
                  <th></th>
                  <th className="text-accent-content">Image</th>
                  <th className="text-accent-content">Name</th>
                  <th className="text-accent-content">Stock Status</th>
                  <th className="text-accent-content">Action</th>
                </tr>
              </thead>
              <tbody>
                {wishlist &&
                  wishlist?.map((item:any) => (
                    <WishItem
                      id={item?.id}
                      title={item?.title}
                      price={item?.price}
                      image={item?.image}
                      slug={item?.slug}
                      stockAvailabillity={item?.stockAvailabillity}
                      key={nanoid()}
                    />
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
