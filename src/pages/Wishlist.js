import React from "react";
import { useSelector } from "react-redux";
import { navbarSelector } from "../redux/reducers/settingReducers";

const Wishlist = () => {
  const viewNavbar = useSelector(navbarSelector);

  return (
    <div
      className={`flex flex-col min-h-screen items-center justify-center ${
        viewNavbar ? "w-full" : "w-full lg:w-9/12 float-right"
      }`}
    >
      Wishlist
    </div>
  );
};

export default Wishlist;
