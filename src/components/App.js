import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { useSelector } from "react-redux";
import { loadingSelector } from "../redux/reducers/settingReducers";
import CartSidebar from "./CartSidebar";
import Navbar from "./Navbar";
import Catalog from "../pages/Catalog";
import Settings from "../pages/Settings";
import Wishlist from "../pages/Wishlist";
import Page404 from "../pages/Page404";
import Loader from "./Loader";

function App() {
  const loading = useSelector(loadingSelector);
  const [open, setOpen] = useState(false);

  const toggleCartBtn = () => {
    setOpen(!open);
  };

  return (
    <>
      <Navbar toggleCartBtn={toggleCartBtn} />
      <CartSidebar open={open} toggleCartBtn={toggleCartBtn} />
      {loading && <Loader />}
      <Routes>
        <Route exact path="/" element={<Catalog />} />
        <Route exact path="/wishlist" element={<Wishlist />} />
        <Route exact path="/settings" element={<Settings />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose="5000"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
