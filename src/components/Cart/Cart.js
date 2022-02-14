import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [error, setError] = useState(null);
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
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    const newOrder = {
      user: userData,
      orderItems: cartCtx.items,
    };
    try {
      const response = await fetch(
        "https://react-learn-http-65e9f-default-rtdb.firebaseio.com/meals-orders.json",
        {
          method: "POST",
          body: JSON.stringify(newOrder),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(
          "Order was not submitt successfully!, Please try again"
        );
      }
      setIsSubmitting(false);
      cartCtx.clearCart();
      setDidSubmit(true);
    } catch (error) {
      setError(error);
    }
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

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      {/* <CartItem /> */}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>

      {isOrdered && (
        <CheckOut
          setIsOrdered={setIsOrdered}
          submitOrderHandler={submitOrderHandler}
        />
      )}
      {!isOrdered && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending your order data</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Your order sent successfully</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.hideCartHandler}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.hideCartHandler}>
      {!didSubmit && !isSubmitting && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;
