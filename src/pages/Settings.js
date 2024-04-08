import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  catalogSelector,
  hideLoader,
  navbarSelector,
  productCardSelector,
  showLoader,
  toggleCatalog,
  toggleNavbar,
  toggleProductCard,
} from "../redux/reducers/settingReducers";
import Loader from "../components/Loader";

const Settings = () => {
  const viewNavbar = useSelector(navbarSelector);
  const viewProductCard = useSelector(productCardSelector);
  const viewCatalog = useSelector(catalogSelector);
  const dispatch = useDispatch();

  const handleChangeNavbar = () => {
    dispatch(showLoader());
    setTimeout(() => {
      dispatch(toggleNavbar());
      dispatch(hideLoader());
    }, 1500);
  };

  const handleChangeProductCard = () => {
    dispatch(showLoader());
    setTimeout(() => {
      dispatch(toggleProductCard());
      dispatch(hideLoader());
    }, 1500);
  };

  const handleChangeCatalog = () => {
    dispatch(showLoader());
    setTimeout(() => {
      dispatch(toggleCatalog());
      dispatch(hideLoader());
    }, 1500);
  };

  return (
    <div
      className={`flex flex-col min-h-full py-6 px-10 ${
        viewNavbar ? "w-full lg:items-center" : "w-full lg:w-9/12 float-right"
      }`}
    >
      <h1 className="text-2xl font-semibold text-gray-900 pb-6">Settings</h1>
      <form className="lg:w-1/2  pt-6">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Navigation bar view
            </label>
            <div className="grid w-full mt-2.5 grid-cols-2 gap-2 rounded-xl bg-gray-300 p-2">
              <div>
                <input
                  type="radio"
                  name="navbarView"
                  id="horizontal"
                  value="horizontal"
                  onClick={handleChangeNavbar}
                  className="peer hidden"
                  disabled={viewNavbar}
                  defaultChecked={viewNavbar}
                />
                <label
                  htmlFor="horizontal"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  Horizontal
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="navbarView"
                  id="vertical"
                  value="vertical"
                  onClick={handleChangeNavbar}
                  className="peer hidden"
                  disabled={!viewNavbar}
                  defaultChecked={!viewNavbar}
                />
                <label
                  htmlFor="vertical"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  Vertical
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Product card view
            </label>
            <div className="grid w-full mt-2.5 grid-cols-2 gap-2 rounded-xl bg-gray-300 p-2">
              <div>
                <input
                  type="radio"
                  name="productCardView"
                  id="variant1"
                  value="variant1"
                  onClick={handleChangeProductCard}
                  className="peer hidden"
                  disabled={viewProductCard}
                  defaultChecked={viewProductCard}
                />
                <label
                  htmlFor="variant1"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  Variant 1
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="productCardView"
                  id="variant2"
                  value="variant2"
                  onClick={handleChangeProductCard}
                  className="peer hidden"
                  disabled={!viewProductCard}
                  defaultChecked={!viewProductCard}
                />
                <label
                  htmlFor="variant2"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  Variant 2
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Catalog view
            </label>
            <div className="grid w-full mt-2.5 grid-cols-2 gap-2 rounded-xl bg-gray-300 p-2">
              <div>
                <input
                  type="radio"
                  name="catalogView"
                  id="viewAll"
                  value="viewAll"
                  onClick={handleChangeCatalog}
                  className="peer hidden"
                  disabled={viewCatalog}
                  defaultChecked={viewCatalog}
                />
                <label
                  htmlFor="viewAll"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  View all
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="catalogView"
                  id="carousel"
                  value="carousel"
                  onClick={handleChangeCatalog}
                  className="peer hidden"
                  disabled={!viewCatalog}
                  defaultChecked={!viewCatalog}
                />
                <label
                  htmlFor="carousel"
                  className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-600 peer-checked:font-bold peer-checked:text-white"
                >
                  Carousel
                </label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Settings;
