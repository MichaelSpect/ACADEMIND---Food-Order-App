import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const cartCtx = useContext(CartContext);
  console.log(cartCtx);

  const addItem = (item) => {
    console.log(item);
    console.log(cartCtx);
    const updatedItemAmount = { ...item, quantity: 1 };
    cartCtx.addItem(updatedItemAmount);
  };
  const removeItem = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <li key={item.id}>
          <CartItem
            name={item.name}
            price={item.price}
            amount={item.quantity}
            addItem={addItem.bind(null, item)}
            removeItem={removeItem.bind(null, item.id)}
          />
        </li>
      ))}
    </ul>
  );

  const orderHandler = () => {
    console.log("ORDER IS CLICKED");
    setIsOrdered(true);
  };
  const modalActions = (
    <div className={classes.actions}>
      <button
        className={classes["button--alt"]}
        onClick={props.hideCartHandler}
      >
        Close
      </button>
      <button className={classes.button} onClick={orderHandler}>
        Order
      </button>
    </div>
  );

  return (
    <Modal onClose={props.hideCartHandler}>
      {cartItems}
      {/* <CartItem /> */}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>

      {isOrdered && <CheckOut setIsOrdered={setIsOrdered} />}
      {!isOrdered && modalActions}
    </Modal>
  );
};

export default Cart;
