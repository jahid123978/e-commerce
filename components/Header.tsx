"use client";
import { usePathname } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell, FaHeart } from "react-icons/fa6";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearWishlist, setWishlist } from "@/app/redux/store/slices/wishlistSlice";
import { logout } from "@/app/redux/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { FaCartShopping } from 'react-icons/fa6'
import { clearCart } from "@/app/redux/store/slices/cartSlice";
import { FaUserCircle } from "react-icons/fa";
const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const wishQuantity = useSelector((state: any) => state.wishlist.items.length);
   const allQuantity = useSelector((state: any) => state.cart.totalQuantity)
  const pathname = usePathname();
  const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
  const handleLogout = () => {
    localStorage.removeItem("email");
    dispatch(logout());
    dispatch(clearCart());
    dispatch(clearWishlist());
    toast.success("Logout successful!");
    router.push("/");
  };

  // getting all wishlist items by user id
  async function getWishlistByUserId(userId: string): Promise<void> {
  
  // 1. Fetch the wishlist entries
  const res = await fetch(
    `${apiBase}/api/wishlist/${encodeURIComponent(userId)}`,
    { cache: "no-store" }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch wishlist: ${res.status} ${res.statusText}`);
  }

  // 2. Parse JSON
  type WishlistEntry = { product: {
    id: string;
    title: string;
    price: number;
    mainImage: string;
    slug: string;
    inStock: number;
  }};
  const entries: WishlistEntry[] = await res.json();

  // 3. Transform into UI model
  const wishlistItems = entries.map(({ product }) => ({
    id: product.id,
    title: product.title,
    price: product.price,
    image: product.mainImage,
    slug: product.slug,
    stockAvailabillity: product.inStock,
  }));

  // 4. Dispatch to Redux
  dispatch(setWishlist(wishlistItems));
}

  // getting user by email so I can get his user id
async function getUserByEmail(): Promise<any> {
  if (!user?.email) {
    // No user logged in; nothing to do
    return ("Login to see your wishlist");
  }

  try {
    // 1. Fetch the user by email
    const userRes = await fetch(
      `${apiBase}/api/users/email/${encodeURIComponent(user?.email)}`,
      { cache: "no-store" }
    );
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user: ${userRes.status} ${userRes.statusText}`);
    }
    const userData: { id: string; name: string; email: string; role: string } =
      await userRes.json();

    // 2. Load wishlist for that user
    await getWishlistByUserId(userData.id);
  } catch (err: any) {
    console.error("getUserByEmail error:", err);
    // Optionally surface to UI:
    toast.error(err.message || "Unable to load user data");
  }
}

  useEffect(() => {
    getUserByEmail();
  }, [user?.email, wishlist.length]);

  return (
       <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between gap-4 sm:gap-6">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 hover:opacity-80 transition-opacity"
            aria-label="Home"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              ShopNest
            </span>
          </Link>

          {/* Search Input - Centered and responsive */}
          <div className="flex-1 max-w-2xl mx-4">
            <SearchInput />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4 sm:gap-6">
            {user?.role === 'admin' ? (
              <>
                {/* Admin Controls */}
                <button
                  aria-label="Notifications"
                  className="p-2 text-gray-600 hover:text-indigo-600 relative transition-colors"
                >
                  <FaBell className="w-5 h-5" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80"
                    aria-label="User menu"
                  >
                    <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-indigo-50 overflow-hidden">
                      {user?.image ? (
                        <Image
                          src={user.image}
                          alt="User profile"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      ) : (
                        <FaUserCircle className="w-full h-full text-gray-400" />
                      )}
                    </div>
                  </label>
                  
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-48 border border-gray-100 mt-2"
                  >
                    <li>
                      <Link
                        href="/admin"
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => handleLogout()}
                        className="px-4 py-2 text-sm text-left text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                {/* User Controls */}
                <div className="flex items-center gap-4 sm:gap-6">
                  <Link href="/wishlist" className="relative hover:text-indigo-600 transition-colors">
                    <FaHeart className="w-6 h-6" />
                    {wishQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                        {wishQuantity}
                      </span>
                    )}
                  </Link>

                  <Link href="/cart" className="relative hover:text-indigo-600 transition-colors">
                    <FaCartShopping className="w-6 h-6" />
                    {allQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center">
                        {allQuantity}
                      </span>
                    )}
                  </Link>

                  {/* Auth Links */}
                  <div className="hidden sm:flex items-center gap-4">
                    {!user ? (
                      <>
                        <Link
                          href="/login"
                          className="text-gray-600 hover:text-indigo-600 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                        >
                          Login
                        </Link>
                        <Link
                          href="/register"
                          className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
                        >
                          Register
                        </Link>
                      </>
                    ) : (
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">{user.name}</span>
                        <button
                          onClick={() => handleLogout()}
                          className="text-gray-600 hover:text-indigo-600 px-3 py-1.5 rounded-md transition-colors text-sm font-medium"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
