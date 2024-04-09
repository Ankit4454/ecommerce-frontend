import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggle, wishlistSelector } from "../redux/reducers/wishlistReducers";
import styles from "../styles/like.module.css";

const Like = (props) => {
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelector);
  const [present, setPresent] = useState(false);
  const { id } = props.product;

  const handleToggleLike = () => {
    dispatch(toggle(props.product));
  };

  useEffect(() => {
    setPresent(wishlist.some((item) => item.id === id));
  }, [id, wishlist]);

  return (
    <div
      onClick={handleToggleLike}
      className={`z-30 ${styles.heartContainer}`}
      title="Like"
    >
      {present ? (
        <input type="checkbox" className={styles.checkbox} defaultChecked />
      ) : (
        <input type="checkbox" className={styles.checkbox} />
      )}
      <div className={styles.svgContainer}>
        <svg
          viewBox="0 0 24 24"
          className={styles.svgOutline}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
        </svg>
        <svg
          viewBox="0 0 24 24"
          className={styles.svgFilled}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
        </svg>
        <svg
          className={styles.svgCelebrate}
          width="40"
          height="40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="4,4 8,8"></polygon>
          <polygon points="4,20 8,20"></polygon>
          <polygon points="8,32 12,28"></polygon>
          <polygon points="36,4 32,8"></polygon>
          <polygon points="36,20 32,20"></polygon>
          <polygon points="32,32 28,28"></polygon>
        </svg>
      </div>
    </div>
  );
};

export default Like;
