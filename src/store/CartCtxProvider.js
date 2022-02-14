import React, { useReducer } from "react";
import CartContext from "./cart-context";

const ACTION = {
  ADD_TO_CART: "add-to-cart",
  REMOVE_ITEM: "remove-item",
  CLEAR_CART: "CLEAR_CART",
};
const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducerFn = (state, action) => {
  // console.log(state);
  if (action.type === ACTION.ADD_TO_CART) {
    console.log("ACTION ITEM", action.item);
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;
    console.log(updatedTotalAmount, +updatedTotalAmount.toFixed(2));

    // finding and updating existing item
    const index = state.items.findIndex((item) => item.id === action.item.id);

    let updatedItems;
    if (index >= 0) {
      // If item is found
      const itemToUpdate = state.items[index];
      const updatedSinglItem = {
        ...itemToUpdate,
        quantity: itemToUpdate.quantity + action.item.quantity,
      };
      state.items[index] = updatedSinglItem;
      // console.log(state.items[index]);
      updatedItems = [...state.items];
    } else {
      // When Item is new in the cart
      updatedItems = [...state.items, action.item];
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: +updatedTotalAmount.toFixed(2),
    };
  }
  if (action.type === ACTION.REMOVE_ITEM) {
    const index = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[index];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== existingItem.id);
    } else {
      const updatedSinglItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      state.items[index] = updatedSinglItem;
      updatedItems = [...state.items];
    }

    return {
      ...state,
      items: updatedItems,
      totalAmount: +updatedTotalAmount.toFixed(2),
    };
  }
  if (action.type === ACTION.CLEAR_CART) {
    return defaultCartState;
  }
};

const CartCtxProvider = (props) => {
  const [cartState, dispatch] = useReducer(cartReducerFn, defaultCartState);

  const addItemToCartHandler = (item) => {
    dispatch({
      type: ACTION.ADD_TO_CART,
      item: item,
    });
  };

  const removeItemFromCartHandler = (id) => {
    dispatch({
      type: ACTION.REMOVE_ITEM,
      id: id,
    });
  };

  const clearCartHandler = () => {
    dispatch({
      type: ACTION.CLEAR_CART,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartCtxProvider;
