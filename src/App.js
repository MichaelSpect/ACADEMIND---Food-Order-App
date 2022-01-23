import React, { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartCtxProvider from "./store/CartCtxProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <CartCtxProvider>
      <Header onShowCart={showCartHandler} />
      {cartIsShown && (
        <Cart hideCartHandler={hideCartHandler} onClose={hideCartHandler} />
      )}
      <main>
        <Meals />
      </main>
      {/* <h2>Let's get started!</h2> */}
    </CartCtxProvider>
  );
}

export default App;
