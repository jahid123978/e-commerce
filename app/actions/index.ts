'use server'

export async function deleteWishItem(id: string){
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlist/${id}`, {
    method: "DELETE",
  });
}

