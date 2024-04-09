import React from "react";
import { useSelector } from "react-redux";
import { navbarSelector } from "../redux/reducers/settingReducers";
import { wishlistSelector } from "../redux/reducers/wishlistReducers";
import ProductCard from "../components/ProductCard";

const Wishlist = () => {
  const viewNavbar = useSelector(navbarSelector);
  const wishlistItems = useSelector(wishlistSelector);

  return (
    <div
      className={`flex flex-col min-h-screen py-6 px-10 ${
        viewNavbar ? "w-full" : "w-full lg:w-9/12 float-right"
      }`}
    >
      <h1 className="text-2xl font-semibold text-gray-900 pb-6">Wishlist</h1>
      <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {wishlistItems.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
