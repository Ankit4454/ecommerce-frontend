import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  hideLoader,
  navbarSelector,
  showLoader,
} from "../redux/reducers/settingReducers";
import { getAllProducts } from "../api";

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
        console.log("Products", res);
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
      className={`flex flex-col min-h-screen items-center justify-center ${
        viewNavbar ? "w-full" : "w-full lg:w-9/12 float-right"
      }`}
    ></div>
  );
};

export default Catalog;
