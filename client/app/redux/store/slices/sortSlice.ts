// src/store/slices/sortSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SortState {
  sortBy: string;
}

const initialState: SortState = {
  sortBy: 'defaultSort',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    changeSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
  },
});

export const { changeSortBy } = sortSlice.actions;
export default sortSlice.reducer;
