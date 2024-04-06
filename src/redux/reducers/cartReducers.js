import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCartItem: (state, action) => {
      state.cart.push(action.payload);
    },
    increment: (state, action) => {
      const _id = action.payload;
      const existingItem = state.cart.find((item) => item._id === _id);
      if (existingItem) {
        existingItem.qty += 1;
      }
    },
    decrement: (state, action) => {
      const _id = action.payload;
      const index = state.cart.findIndex((item) => item._id === _id);

      if (index !== -1) {
        if (state.cart[index].qty === 1) {
          state.cart.splice(index, 1);
        } else {
          state.cart[index].qty -= 1;
        }
      }
    },
    deleteCartItem: (state, action) => {
      const _id = action.payload;
      const index = state.cart.findIndex((item) => item._id === _id);

      if (index !== -1) {
        state.cart.splice(index, 1);
      }
    },
    emptyCart: (state, action) => {
      state.cart = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addCartItem, increment, decrement, deleteCartItem, emptyCart } =
  cartSlice.actions;
export const cartSelector = (state) => state.cart.cart;
