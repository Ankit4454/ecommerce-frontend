import React from "react";
import { useDispatch } from "react-redux";
import { toggleNavbar } from "../redux/reducers/settingReducers";

const Settings = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <h1>Settings</h1>
      <button onClick={() => dispatch(toggleNavbar())}>Horizontal</button>
      <button onClick={() => dispatch(toggleNavbar())}>Vertical</button>
    </div>
  );
};

export default Settings;
