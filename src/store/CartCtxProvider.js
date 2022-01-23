import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTION = {
  ADD_TO_CART: "add-to-cart",
  REMOVE_ITEM: "remove-item",
};
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const CartCtxProvider = (props) => {
  const cartReducerFn = (state, action) => {
    console.log(state);
    if (action.type === ACTION.ADD_TO_CART) {
      const updatedItems = [...state.items, action.item];
      console.log(updatedItems);
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount,
      };
    }
  };
  const [cartState, dispatch] = useReducer(cartReducerFn, defaultCartState);

  const addItemToCartHandler = (item) => {
    console.log(item);
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: item,
    });
  };

  const removeItemFromCartHandler = () => {};

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
