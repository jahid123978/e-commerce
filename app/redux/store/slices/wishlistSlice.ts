// src/store/slices/wishlistSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductInWishlist {
  id: string;
  title: string;
  price: number;
  image: string;
  slug: string;
 stockAvailabillity: number;
}

interface WishlistState {
  items: ProductInWishlist[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<ProductInWishlist>) {
      const exists = state.items.find(i => i.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
    setWishlist(state, action: PayloadAction<ProductInWishlist[]>) {
      state.items = action.payload;
    },
    clearWishlist(state) {
      state.items = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
