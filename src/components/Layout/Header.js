import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Food Order App</h1>
        <button>Cart</button>
      </header>
      <div>
        <img
          className={classes["main-image"]}
          src={mealsImage}
          alt="A table full of food!"
        />
      </div>
    </Fragment>
  );
};

export default Header;
