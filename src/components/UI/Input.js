import React, { useRef, useImperativeHandle } from "react";
import classes from "./Input.module.css";

const Input = React.forwardRef((props, ref) => {
  const itemQuantityInput = useRef();

  // const inputHandler = () => {
  //   console.log(itemQuantityInput.current);
  // };

  useImperativeHandle(ref, () => {
    return {
      inputValue: itemQuantityInput.current,
    };
  });

  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={itemQuantityInput} {...props.input} />
    </div>
  );
});

export default Input;
