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
import $ from "jquery";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel";
import { FcNext, FcPrevious } from "react-icons/fc";
import { PiCurrencyDollarDuotone } from "react-icons/pi";

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
        let res;
        if (viewCatalog) {
          res = await getLimitedProducts(limit);
        } else {
          res = await getAllProducts();
        }
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
    if (viewCatalog) {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [limit, viewCatalog]);

  useEffect(() => {
    if (!viewCatalog) {
      const main_slider = $("#main-slider");
      main_slider.owlCarousel({
        rtl: false,
        loop: true,
        dots: true,
        responsive: {
          0: {
            items: 1,
          },
        },
      });

      $(".customNextBtn").on("click", function () {
        main_slider.trigger("next.owl.carousel");
      });
      $(".customPrevBtn").on("click", function () {
        main_slider.trigger("prev.owl.carousel");
      });

      return () => {
        $(".customNextBtn").off("click");
        $(".customPrevBtn").off("click");
        main_slider.owlCarousel("destroy");
      };
    }
  }, [products, viewCatalog]);

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
        <>
          <section className="relative">
            <div id="main-slider" className="owl-carousel owl-theme relative">
              {products.map((product) => (
                <div
                  key={`main-${product.id}`}
                  className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl mx-auto"
                >
                  <div className="relative flex flex-col items-start">
                    <img
                      alt={product.title}
                      className="aspect-square object-contain w-full rounded-lg overflow-hidden dark:border-gray-800"
                      height={300}
                      src={product.image}
                      width={300}
                    />
                  </div>
                  <div className="flex flex-col h-full md:justify-center gap-4">
                    <h2 class="text-xl md:text-3xl lg:text-4xl font-semibold">
                      {product.title}
                    </h2>
                    <div className="flex items-center">
                      <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                        {product.rating.rate}
                      </span>
                      {!isNaN(product.rating.rate) &&
                        Array.from(
                          { length: Math.floor(product.rating.rate) },
                          (_, index) => (
                            <svg
                              key={index}
                              aria-hidden="true"
                              className="h-5 w-5 text-yellow-300"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          )
                        )}
                      {!isNaN(product.rating.rate) &&
                        product.rating.rate % 1 !== 0 && (
                          <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <defs>
                              <linearGradient id="gradient-star">
                                <stop
                                  offset={`${(product.rating.rate % 1) * 100}%`}
                                  stopColor="#fde047"
                                />
                                <stop
                                  offset={`${
                                    (1 - (product.rating.rate % 1)) * 100
                                  }%`}
                                  stopColor="white"
                                />
                              </linearGradient>
                            </defs>
                            <path
                              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              fill={`url(#gradient-star)`}
                            ></path>
                          </svg>
                        )}
                      <span className="text-sm">({product.rating.count} Reviews)</span>
                    </div>
                    <p className="text-sm">{product.description}</p>
                    <p className="flex items-center mt-1 text-2xl font-medium text-gray-900">
                      <PiCurrencyDollarDuotone />
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute flex items-center justify-center z-40 h-10 w-10 rounded-3xl bg-black bg-opacity-15 left-0 top-[15%] md:top-[40%]">
              <button
                type="button"
                role="presentation"
                className="customPrevBtn py-1 px-2 rounded-sm hover:bg-acent"
              >
                <FcPrevious />
              </button>
            </div>
            <div className="absolute flex items-center justify-center z-40 h-10 w-10 rounded-3xl bg-black bg-opacity-15 right-0 top-[15%] md:top-[40%]">
              <button
                type="button"
                role="presentation"
                className="customNextBtn py-1 px-2 rounded-sm hover:bg-acent"
              >
                <FcNext />
              </button>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Catalog;
