import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import paginationReducer from './slices/paginationSlice';
import sortReducer from './slices/sortSlice';   
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';
export const store = configureStore({
  reducer: {
    user: userReducer,
    pagination: paginationReducer,
    sort: sortReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
