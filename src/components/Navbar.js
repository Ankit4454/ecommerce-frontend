import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { navbarSelector } from "../redux/reducers/settingReducers";
import { cartSelector } from "../redux/reducers/cartReducers";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBoxSeam, BsHeart } from "react-icons/bs";
import { RiSettingsLine } from "react-icons/ri";

const Navbar = (props) => {
  const location = useLocation();
  const viewNavbar = useSelector(navbarSelector);
  const cartItems = useSelector(cartSelector);
  const [cartCount, setCartCount] = useState(0);

  const handleBurgerClick = () => {
    const menu = document.querySelectorAll(".navbar-menu");
    for (let j = 0; j < menu.length; j++) {
      menu[j].classList.toggle("hidden");
    }
  };

  useEffect(() => {
    setCartCount(cartItems.length);
  }, [cartItems.length]);

  return viewNavbar ? (
    <>
      <nav className="sticky top-0 left-0 right-0 z-50 px-10 py-5 flex justify-between items-center border-b bg-white">
        <Link className="text-3xl font-bold text-blue-500 leading-none" to="/">
          eCommerce
        </Link>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link
              className={`${
                location.pathname === "/"
                  ? "text-sm font-semibold text-blue-600 navbar-link"
                  : "text-sm text-gray-500 hover:text-gray-800 navbar-link"
              }`}
              to="/"
            >
              Catalog
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link
              className={`${
                location.pathname.includes("/wishlist")
                  ? "text-sm font-semibold text-blue-600 navbar-link"
                  : "text-sm text-gray-500 hover:text-gray-800 navbar-link"
              }`}
              to="/wishlist"
            >
              Wishlist
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link
              className={`${
                location.pathname.includes("/settings")
                  ? "text-sm font-semibold text-blue-600 navbar-link"
                  : "text-sm text-gray-500 hover:text-gray-800 navbar-link"
              }`}
              to="/settings"
            >
              Settings
            </Link>
          </li>
        </ul>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-500 p-3"
            onClick={handleBurgerClick}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <button
          onClick={props.toggleCartBtn}
          className="hidden cursor-pointer relative lg:flex lg:items-center py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-3xl transition duration-200"
        >
          <MdShoppingCartCheckout className="mr-2" size={20} />
          {cartCount !== 0 && (
            <span className="absolute bg-gray-200 text-gray-900 px-2 py-1 text-xs font-bold rounded-full -top-3 -right-2">
              {cartCount}
            </span>
          )}
          Cart
        </button>
      </nav>
      <div className="navbar-menu relative z-50 hidden">
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={handleBurgerClick}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link
              className="mr-auto text-3xl text-blue-500 font-bold leading-none"
              to="/"
            >
              eCommerce
            </Link>
            <button className="navbar-close" onClick={handleBurgerClick}>
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/"
                  onClick={handleBurgerClick}
                >
                  Catalog
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/wishlist"
                  onClick={handleBurgerClick}
                >
                  Wishlist
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/settings"
                  onClick={handleBurgerClick}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <button
                className="flex w-full items-center justify-center px-4 py-3 mb-2 leading-loose text-xs text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-3xl"
                onClick={() => {
                  props.toggleCartBtn();
                  handleBurgerClick();
                }}
              >
                <MdShoppingCartCheckout className="mr-2" size={20} /> Cart
              </button>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  ) : (
    <>
      <nav className="fixed top-0 left-0 bottom-0 flex flex-col justify-between w-5/6 max-w-sm py-6 bg-gray-50 border-r overflow-y-auto">
        <div className="w-full">
          <Link
            className="text-3xl w-full font-bold text-blue-500 px-10 leading-none"
            to="/"
          >
            eCommerce
          </Link>
          <div className="border-t mt-6"></div>
          <ul className="py-6 px-10 space-y-6">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "flex items-center font-semibold text-gray-800 space-x-3"
                    : "flex items-center text-gray-500 hover:text-gray-800 space-x-3"
                }`}
              >
                <BsBoxSeam />
                <span>Catalog</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className={`${
                  location.pathname.includes("/wishlist")
                    ? "flex items-center font-semibold text-gray-800 space-x-3"
                    : "flex items-center text-gray-500 hover:text-gray-800 space-x-3"
                }`}
              >
                <BsHeart />
                <span>Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className={`${
                  location.pathname.includes("/settings")
                    ? "flex items-center font-semibold text-gray-800 space-x-3"
                    : "flex items-center text-gray-500 hover:text-gray-800 space-x-3"
                }`}
              >
                <RiSettingsLine />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="px-10">
          <button
            className="flex w-full items-center justify-center px-4 py-3 mb-2 leading-loose text-xs text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-3xl"
            onClick={props.toggleCartBtn}
          >
            <MdShoppingCartCheckout className="mr-2" size={20} /> Cart
          </button>
        </div>
      </nav>
      <div className="absolute top-4 right-10 lg:hidden">
        <button
          className="navbar-burger flex items-center text-blue-500 p-3"
          onClick={handleBurgerClick}
        >
          <svg
            className="block h-4 w-4 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Mobile menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </button>
      </div>
      <div className="navbar-menu relative z-50 hidden">
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={handleBurgerClick}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <Link
              className="mr-auto text-3xl text-blue-500 font-bold leading-none"
              to="/"
            >
              eCommerce
            </Link>
            <button className="navbar-close" onClick={handleBurgerClick}>
              <svg
                className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div>
            <ul>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/"
                  onClick={handleBurgerClick}
                >
                  Catalog
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/wishlist"
                  onClick={handleBurgerClick}
                >
                  Wishlist
                </Link>
              </li>
              <li className="mb-1">
                <Link
                  className="block p-4 text-sm font-semibold text-gray-500 hover:bg-blue-50 hover:text-blue-500 rounded"
                  to="/settings"
                  onClick={handleBurgerClick}
                >
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <button
                className="flex w-full items-center justify-center px-4 py-3 mb-2 leading-loose text-xs text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-3xl"
                onClick={() => {
                  props.toggleCartBtn();
                  handleBurgerClick();
                }}
              >
                <MdShoppingCartCheckout className="mr-2" size={20} /> Cart
              </button>
            </div>
            <p className="my-4 text-xs text-center text-gray-400">
              <span>Copyright © 2024</span>
            </p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
