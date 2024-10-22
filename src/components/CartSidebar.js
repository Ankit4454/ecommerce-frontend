import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { IoCloseOutline } from "react-icons/io5";
import { PiCurrencyDollarDuotone } from "react-icons/pi";
import Cart from "./Cart";
import { cartSelector } from "../redux/reducers/cartReducers";

const CartSidebar = (props) => {
  const sidebarRef = useRef(null);
  const cartItems = useSelector(cartSelector);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (props.open) {
          props.toggleCartBtn();
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [props]);

  useEffect(() => {
    const newTotal = cartItems.reduce((acc, cart) => {
      return acc + cart.price * cart.qty;
    }, 0);
    setTotal(Number(newTotal.toFixed(2)));
  }, [cartItems]);

  return (
    <div
      ref={sidebarRef}
      className={`fixed h-full right-0 w-5/6 max-w-sm bg-white z-50 overflow-y-auto transform transition-transform ease-in-out border-l duration-300 ${
        props.open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="text-xl font-semibold">Shopping Cart</h2>
        <button
          onClick={props.toggleCartBtn}
          className="text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          <IoCloseOutline size={24} />
        </button>
      </div>
      <div className="border-t"></div>
      {cartItems.length === 0 && (
        <div className="text-center p-6">
          <h2 className="text-lg">Your cart is empty!</h2>
          <p className="text-sm">Add item to it.</p>
        </div>
      )}
      <div className="p-6">
        <ul className="-my-6 divide-y divide-gray-200 max-h-[380px] overflow-y-scroll no-scrollbar">
          {cartItems.map((product) => (
            <Cart key={product.id} cart={product} />
          ))}
        </ul>
      </div>
      {cartItems.length !== 0 ? (
        <div className="border-t border-gray-200 p-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p className="flex items-center">
              <PiCurrencyDollarDuotone /> {total}
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={props.toggleCartBtn}
              className="w-full flex items-center justify-center rounded-3xl border border-transparent bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-500"
            >
              Checkout
            </button>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <button
                type="button"
                className="font-medium text-blue-500 hover:text-blue-600"
                onClick={props.toggleCartBtn}
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="border-t border-gray-200 p-6 sm:px-6">
          <div>
            <div
              onClick={props.toggleCartBtn}
              className="flex items-center justify-center cursor-pointer rounded-3xl border border-transparent bg-blue-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-600"
            >
              Shop now
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
