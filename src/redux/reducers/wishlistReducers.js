import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: initialState,
  reducers: {
    toggle: (state, action) => {
      const { _id } = action.payload;
      const index = state.wishlist.findIndex((item) => item._id === _id);

      if (index !== -1) {
        state.wishlist.splice(index, 1);
      } else {
        state.wishlist.push(action.payload);
      }
    },
  },
});

export const wishlistReducer = wishlistSlice.reducer;
export const { toggle } = wishlistSlice.actions;
export const wishlistSelector = (state) => state.wishlist.wishlist;
