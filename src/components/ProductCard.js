import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productCardSelector } from "../redux/reducers/settingReducers";
import {
  cartSelector,
  addCartItem,
  increment,
  decrement,
} from "../redux/reducers/cartReducers";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";
import Like from "./Like";
import CartButton from "./CartButton";

const ProductCard = (props) => {
  const { id, title, price, image, rating } = props.product;
  const dispatch = useDispatch();
  const viewProductCard = useSelector(productCardSelector);
  const cartItems = useSelector(cartSelector);
  const [present, setPresent] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleAddCart = () => {
    dispatch(addCartItem({ ...props.product, qty: 1 }));
  };

  const handleIncreaseQty = () => {
    dispatch(increment(id));
  };

  const handleDecreaseQty = () => {
    dispatch(decrement(id));
  };

  useEffect(() => {
    setPresent(cartItems.some((cart) => cart.id === id));
    const foundItem = cartItems.find((cart) => cart.id === id);
    if (foundItem) {
      setQuantity(foundItem.qty);
    } else {
      setQuantity(0);
    }
  }, [cartItems, id]);

  return viewProductCard ? (
    <>
      <div className="relative group">
        <div className="aspect-h-1 aspect-w-1 h-[350px] w-full overflow-hidden rounded-lg bg-white xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain object-center mix-blend-multiply group-hover:opacity-75"
          />
        </div>
        <div className="flex flex-col h-48 justify-between">
          <div className="relative">
            <div className="absolute top-4 right-0">
              <Like product={props.product} />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{title}</h3>
            <div className="mt-2.5 mb-5 flex items-center justify-between">
              <div className="flex items-center">
                <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                  {rating.rate}
                </span>
                {!isNaN(rating.rate) &&
                  Array.from(
                    { length: Math.floor(rating.rate) },
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
                {!isNaN(rating.rate) && rating.rate % 1 !== 0 && (
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
                          offset={`${(rating.rate % 1) * 100}%`}
                          stopColor="#fde047"
                        />
                        <stop
                          offset={`${(1 - (rating.rate % 1)) * 100}%`}
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
              </div>
              <span className="text-sm text-gray-700">
                {rating.count} Reviews
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="flex items-center mt-1 text-lg font-medium text-gray-900">
              <PiCurrencyDollarDuotone />
              {price}
            </p>

            {!present && (
              <div className="flex items-center">
                {" "}
                <CartButton handleAddCart={handleAddCart} />
              </div>
            )}
            {present && (
              <div className="flex items-center">
                <PiMinusThin
                  className="mr-2 cursor-pointer"
                  size={24}
                  onClick={handleDecreaseQty}
                />
                <p className="text-xl">{quantity}</p>
                <PiPlusThin
                  className="ml-2 cursor-pointer"
                  size={24}
                  onClick={handleIncreaseQty}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="relative flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-clip-border shadow-lg shadow-blue-gray-500/40">
          <div className="absolute top-1 right-1">
            <Like product={props.product} />
          </div>
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="h-full w-full object-contain object-center mix-blend-multiply group-hover:opacity-75"
          />
        </div>
        <div className="flex flex-col h-72 justify-between">
          <div className="block p-6">
            <h5 className="mb-2 block text-sm font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {title}
            </h5>
            <div className="mt-2.5 mb-5 flex items-center">
              <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
                {rating.rate}
              </span>
              {!isNaN(rating.rate) &&
                Array.from({ length: Math.floor(rating.rate) }, (_, index) => (
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
                ))}
              {!isNaN(rating.rate) && rating.rate % 1 !== 0 && (
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
                        offset={`${(rating.rate % 1) * 100}%`}
                        stopColor="#fde047"
                      />
                      <stop
                        offset={`${(1 - (rating.rate % 1)) * 100}%`}
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
            </div>
            <div className="flex items-center text-base font-light leading-relaxed text-inherit antialiased">
              <PiCurrencyDollarDuotone />
              {price}
            </div>
          </div>
          <div className="flex justify-center p-6 pt-0">
            {!present && (
              <button
                onClick={handleAddCart}
                data-ripple-light="true"
                type="button"
                className="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              >
                Add to Cart
              </button>
            )}
            {present && (
              <div className="flex items-center">
                <PiMinusThin
                  className="mr-2 cursor-pointer"
                  size={24}
                  onClick={handleDecreaseQty}
                />
                <p className="text-xl">{quantity}</p>
                <PiPlusThin
                  className="ml-2 cursor-pointer"
                  size={24}
                  onClick={handleIncreaseQty}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
