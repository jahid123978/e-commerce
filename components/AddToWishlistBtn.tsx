"use client";
import { addToWishlist, removeFromWishlist } from "@/app/redux/store/slices/wishlistSlice";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaHeartCrack } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

interface AddToWishlistBtnProps {
  product: Product;
  slug: string;
}

const AddToWishlistBtn = ({ product, slug }: AddToWishlistBtnProps) => {

  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.items);
  const user = useSelector((state: any) => state.user.user);


  const [isProductInWishlist, setIsProductInWishlist] = useState<boolean>(false);

  // const addToWishlistFun = async () => {
  //   console.log("user", user);  
  //   if (user?.email) {
  //     try {
  //       const userRes = await fetch(
  //         `http://localhost:3001/api/users/email/${user.email}`,
  //         { cache: "no-store" }
  //       );
  //       const userData = await userRes.json();

  //       const res = await fetch("http://localhost:3001/api/wishlist", {
  //         method: "POST",
  //         headers: {
  //           Accept: "application/json, text/plain, */*",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           productId: product.id,
  //           userId: userData.id,
  //         }),
  //       });

  //       if (res.status === 200) {
  //         dispatch(
  //           addToWishlist({
  //             id: product.id,
  //             title: product.title,
  //             price: product.price,
  //             image: product.mainImage,
  //             slug: product.slug,
  //             stockAvailabillity: product.inStock,
  //           })
  //         );
  //         toast.success("Product added to the wishlist");
  //         setIsProductInWishlist(true);
  //       }
  //     } catch (error) {
  //       console.error("Failed to add to wishlist", error);
  //     }
  //   } else {
  //     toast.error("You need to be logged in to add a product to the wishlist");
  //   }
  // };
 
  const addToWishlistFun = async () => {
  if (!user?.email) {
    toast.error("You need to be logged in to add items to your wishlist");
    return;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  try {
    // 1. Fetch user ID by email
    const userRes = await fetch(
      `${apiBase}/api/users/email/${encodeURIComponent(user.email)}`,
      { cache: "no-cache" }
    );
    if (!userRes.ok) {
      throw new Error("Unable to retrieve user information");
    }
    const { id: userId } = await userRes.json();

    // 2. Add to wishlist
    const wishlistRes = await fetch(`${apiBase}/api/wishlist`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, userId }),
    });
    if (!wishlistRes.ok) {
      const errBody = await wishlistRes.json();
      throw new Error(errBody.error || "Failed to add product to wishlist");
    }

    // 3. Update Redux and UI
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.mainImage,
        slug: product.slug,
        stockAvailabillity: product.inStock,
      })
    );
    toast.success("Product added to your wishlist");
    setIsProductInWishlist(true);

  } catch (err: any) {
    console.error("addToWishlistFun error:", err);
    toast.error(err.message || "An unexpected error occurred");
  }
};

  // const removeFromWishlistFun = async () => {
  //   if (user?.email) {
  //     try {
  //       const userRes = await fetch(
  //         `http://localhost:3001/api/users/email/${user.email}`,
  //         { cache: "no-store" }
  //       );
  //       const userData = await userRes.json();

  //       const res = await fetch(
  //         `http://localhost:3001/api/wishlist/${userData.id}/${product.id}`,
  //         {
  //           method: "DELETE",
  //         }
  //       );

  //       if (res.status === 204) {
  //         dispatch(removeFromWishlist(product.id));
  //         toast.success("Product removed from the wishlist");
  //         setIsProductInWishlist(false);
  //       }
  //     } catch (error) {
  //       console.error("Failed to remove from wishlist", error);
  //     }
  //   }
  // };

const removeFromWishlistFun = async () => {
  if (!user?.email) {
    toast.error("You need to be logged in to remove items from your wishlist");
    return;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  try {
    // 1. Fetch user ID by email
    const emailEncoded = encodeURIComponent(user.email);
    const userRes = await fetch(`${apiBase}/api/users/email/${emailEncoded}`, {
      cache: "no-cache",
    });
    if (!userRes.ok) {
      throw new Error("Unable to retrieve user information");
    }
    const { id: userId } = await userRes.json();

    // 2. Delete the wishlist item
    const deleteRes = await fetch(
      `${apiBase}/api/wishlist/${userId}/${encodeURIComponent(product.id)}`,
      {
        method: "DELETE",
      }
    );
    if (!deleteRes.ok) {
      // If your API returns JSON error body, read it
      let errMsg = `Failed to remove item (status ${deleteRes.status})`;
      try {
        const errBody = await deleteRes.json();
        if (errBody.error) errMsg = errBody.error;
      } catch {} // ignore JSON parse errors
      throw new Error(errMsg);
    }

    // 3. Update Redux and UI
    dispatch(removeFromWishlist(product.id));
    setIsProductInWishlist(false);
    toast.success("Product removed from your wishlist");
  } catch (err: any) {
    console.error("removeFromWishlistFun error:", err);
    toast.error(err.message || "An unexpected error occurred");
  }
};

  // const checkWishlistStatus = async () => {
  //   if (user?.email) {
  //     try {
  //       const userRes = await fetch(
  //         `http://localhost:3001/api/users/email/${user.email}`,
  //         { cache: "no-store" }
  //       );
  //       const userData = await userRes.json();

  //       const res = await fetch(
  //         `http://localhost:3001/api/wishlist/${userData.id}/${product.id}`
  //       );
  //       const data = await res.json();

  //       setIsProductInWishlist(!!data[0]?.id);
  //     } catch (error) {
  //       console.error("Failed to check wishlist status", error);
  //     }
  //   }
  // };

  const checkWishlistStatus = async () => {
  if (!user?.email) {
    setIsProductInWishlist(false);
    return;
  }

  const apiBase = process.env.NEXT_PUBLIC_API_URL;
  try {
    // 1. Get user ID by email
    const emailEncoded = encodeURIComponent(user.email);
    const userRes = await fetch(`${apiBase}/api/users/email/${emailEncoded}`, {
      cache: "no-cache",
    });
    if (!userRes.ok) {
      throw new Error(`Failed to fetch user: ${userRes.statusText}`);
    }
    const { id: userId } = await userRes.json();

    // 2. Check wishlist entry
    const productIdEncoded = encodeURIComponent(product.id);
    const wishRes = await fetch(`${apiBase}/api/wishlist/${userId}/${productIdEncoded}`, {
      cache: "no-cache",
    });
    if (!wishRes.ok && wishRes.status !== 404) {
      // 404 means “not found” → not in wishlist
      throw new Error(`Failed to check wishlist: ${wishRes.statusText}`);
    }

    // 3. Parse response if 200
    if (wishRes.status === 200) {
      const wishData = await wishRes.json();
      // If the API returns an array, check for non-empty
      setIsProductInWishlist(Array.isArray(wishData) && wishData.length > 0);
    } else {
      // 404 or other non-200 → not in wishlist
      setIsProductInWishlist(false);
    }
  } catch (err: any) {
    console.error("checkWishlistStatus error:", err);
    // On error, assume not in wishlist 
    setIsProductInWishlist(false);
  }
};
  useEffect(() => {
    checkWishlistStatus();
  }, [user?.email, wishlist]);

  return (
   <>
      {isProductInWishlist ? (
        <p
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={removeFromWishlistFun}
        >
          <FaHeartCrack className="text-xl text-custom-black" />
          <span className="text-lg">REMOVE FROM WISHLIST</span>
        </p>
      ) : (
        <p
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={addToWishlistFun}
        >
          <FaHeart className="text-xl text-custom-black" />
          <span className="text-lg">ADD TO WISHLIST</span>
        </p>
      )}
    </>
  );
};

export default AddToWishlistBtn;
