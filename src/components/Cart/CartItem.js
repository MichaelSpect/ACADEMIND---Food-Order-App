import React from "react";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  const decreaseAmountHandler = () => {
    props.amount = props.amount - 1;
  };
  const increaseAmountHandler = () => {
    props.amount = props.amount + 1;
  };
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
        <button onClick={decreaseAmountHandler}>-</button>
        <button onClick={increaseAmountHandler}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
