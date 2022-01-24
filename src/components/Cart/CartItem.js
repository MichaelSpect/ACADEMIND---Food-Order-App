import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  // const decreaseAmountHandler = () => {
  //   props.removeItem();
  // };
  // const increaseAmountHandler = () => {
  //   props.addItem();
  // };
  return (
    <div className={classes["cart-item"]}>
      <div>
        <h2 className="">{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={props.removeItem}>-</button>
        <button onClick={props.addItem}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
