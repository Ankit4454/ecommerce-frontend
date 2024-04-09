import React from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import styles from "../styles/button.module.css";

const CartButton = (props) => {
  return (
    <button onClick={props.handleAddCart} className={styles.cartBtn}>
      <span className={styles.iconContainer}>
        <MdOutlineAddShoppingCart size={24} />
      </span>
      <p className={styles.text}>Add to Cart</p>
    </button>
  );
};

export default CartButton;
