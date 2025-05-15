// src/store/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProductInCart {
  id: string;
  title: string;
  price: number;
  image: string;
  amount: number;
}

interface CartState {
  products: ProductInCart[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ProductInCart>) {
      const item = state.products.find(p => p.id === action.payload.id);
      if (item) {
        item.amount += action.payload.amount;
      } else {
        state.products.push(action.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    updateCartAmount(state, action: PayloadAction<{ id: string; amount: number }>) {
      const item = state.products.find(p => p.id === action.payload.id);
      if (item) item.amount = action.payload.amount;
    },
    clearCart(state) {
      state.products = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
    calculateTotals(state) {
      let qty = 0, sum = 0;
      state.products.forEach(p => {
        qty += p.amount;
        sum += p.amount * p.price;
      });
      state.totalQuantity = qty;
      state.totalPrice = sum;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartAmount,
  clearCart,
  calculateTotals,
} = cartSlice.actions;
export default cartSlice.reducer;
