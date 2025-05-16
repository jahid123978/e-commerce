// src/store/slices/paginationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  page: number;
}

const initialState: PaginationState = {
  page: 1,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    decrementPage(state) {
      if (state.page > 1) state.page -= 1;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { incrementPage, decrementPage, setPage } = paginationSlice.actions;
export default paginationSlice.reducer;
