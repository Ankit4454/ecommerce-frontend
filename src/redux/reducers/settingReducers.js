import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  viewNavbar: true,
  viewProductCard: true,
  viewCatalog: true,
};

const settingSlice = createSlice({
  name: "setting",
  initialState: initialState,
  reducers: {
    toggleNavbar: (state, action) => {
      return {
        ...state,
        viewNavbar: !state.viewNavbar,
      };
    },
    toggleProductCard: (state, action) => {
      return {
        ...state,
        viewProductCard: !state.viewProductCard,
      };
    },
    toggleCatalog: (state, action) => {
      return {
        ...state,
        viewCatalog: !state.viewCatalog,
      };
    },
  },
});

export const settingReducer = settingSlice.reducer;
export const { toggleNavbar, toggleProductCard, toggleCatalog } =
  settingSlice.actions;
export const navbarSelector = (state) => state.setting.viewNavbar;
export const productCardSelector = (state) => state.setting.viewProductCard;
export const catalogSelector = (state) => state.setting.viewCatalog;
