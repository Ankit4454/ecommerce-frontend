import React, { useState, useEffect } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { PiPlusThin, PiMinusThin } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelector,
  decrement,
  deleteCartItem,
  increment,
} from "../redux/reducers/cartReducers";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cartSelector);
  const { id, picture, name, price } = props.cart;
  const [quantity, setQuantity] = useState();

  const handleDeleteCart = () => {
    dispatch(deleteCartItem(id));
  };

  const handleIncreaseQty = () => {
    dispatch(increment(id));
  };

  const handleDecreaseQty = () => {
    dispatch(decrement(id));
  };

  useEffect(() => {
    const foundItem = cartItems.find((cart) => cart.id === id);
    if (foundItem) {
      setQuantity(foundItem.qty);
    } else {
      setQuantity(0);
    }
  }, [cartItems, id]);

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={picture}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{name}</h3>
            <p className="ml-4 flex items-center">
              <LiaRupeeSignSolid /> {price}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center">
            <PiMinusThin
              className="mr-2 cursor-pointer"
              size={16}
              onClick={handleDecreaseQty}
            />
            <p className="text-gray-500">{quantity}</p>
            <PiPlusThin
              className="ml-2 cursor-pointer"
              size={16}
              onClick={handleIncreaseQty}
            />
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={handleDeleteCart}
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Cart;
