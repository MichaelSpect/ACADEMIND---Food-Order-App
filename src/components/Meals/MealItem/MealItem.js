import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const priceFormated = `$${props.price.toFixed(2)}`;
  const ctx = useContext(CartContext);
  // console.log(ctx);
  const addItemHandler = () => {
    console.log("clicked +Add - Submit");
    const itemToCart = {
      id: props.id,
      name: props.name,
      price: props.price,
    };
    ctx.addItem(itemToCart);
    console.log(ctx);
  };
  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{priceFormated}</div>
      </div>
      <MealItemForm id={props.id} addItemHandler={addItemHandler} />
      {/* <div>
        <div>Amount</div>
        <button>+ Add</button>
      </div> */}
    </li>
  );
};

export default MealItem;
