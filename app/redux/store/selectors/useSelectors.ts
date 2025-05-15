import { stat } from 'fs';
import {RootState} from '../../store';
//whislist selectors
export const selectWishlist = (state: RootState) => state.wishlist.items;
export const selectWishQuantity = (state: RootState) => state.wishlist.items.length;

//user selectors
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthenticated = (state: RootState) => state.user.isAuthenticated;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;


//cart selectors 
export const selectCartProducts = (state: RootState) => state.cart.products;
export const selectCartQuantity = (state: RootState) => state.cart.totalQuantity;
export const selectCartTotal = (state: RootState) => state.cart.totalPrice;

//sort selectors
export const selectSortBy = (state: RootState) => state.sort.sortBy;

// pagination selectors
export const selectPage = (state: RootState) => state.pagination.page;
