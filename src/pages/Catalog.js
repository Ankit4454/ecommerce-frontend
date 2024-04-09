import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  hideLoader,
  navbarSelector,
  showLoader,
} from "../redux/reducers/settingReducers";
import { getAllProducts } from "../api";
import ProductCard from "../components/ProductCard";

const Catalog = () => {
  const viewNavbar = useSelector(navbarSelector);
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch(showLoader());
        const res = await getAllProducts();
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(hideLoader());
      }
    }
    fetchData();
  }, []);

  return (
    <div
      className={`flex flex-col min-h-screen py-6 px-10 ${
        viewNavbar ? "w-full" : "w-full lg:w-9/12 float-right"
      }`}
    >
      <h1 className="text-2xl font-semibold text-gray-900 pb-6">Catalog</h1>
      <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
