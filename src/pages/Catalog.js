import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  hideLoader,
  navbarSelector,
  catalogSelector,
  showLoader,
} from "../redux/reducers/settingReducers";
import { getAllProducts, getLimitedProducts } from "../api";
import ProductCard from "../components/ProductCard";

const Catalog = () => {
  const viewNavbar = useSelector(navbarSelector);
  const viewCatalog = useSelector(catalogSelector);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    async function fetchData(limit) {
      try {
        dispatch(showLoader());
        const res = await getLimitedProducts(limit);
        if (res.success) {
          setProducts(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(hideLoader());
      }
    }

    const handleScroll = () => {
      const scrollTop = (document.documentElement || document.body).scrollTop;
      const scrollHeight = (document.documentElement || document.body)
        .scrollHeight;
      const clientHeight = window.innerHeight;

      const scrollThreshold = 50;
      const hasScrolledToBottom =
        scrollTop + clientHeight + scrollThreshold >= scrollHeight;

      if (hasScrolledToBottom && limit === 10) {
        setLimit((prevLimit) => prevLimit + 10);
      }
    };
    fetchData(limit);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [limit]);

  return (
    <div
      className={`flex flex-col min-h-screen py-6 px-10 ${
        viewNavbar ? "w-full" : "w-full lg:w-9/12 float-right"
      }`}
    >
      <h1 className="text-2xl font-semibold text-gray-900 pb-6">Catalog</h1>
      {viewCatalog ? (
        <div className="py-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Catalog;
