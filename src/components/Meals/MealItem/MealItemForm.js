import React, { useRef } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props, ref) => {
  const itemQuantityInput = useRef();
  // useImperativeHandle(ref, () => {
  //   return {};
  // });
  const submitHandler = (e) => {
    e.preventDefault();
    const inputValue = itemQuantityInput.current.inputValue.valueAsNumber;
    console.log(inputValue);

    props.addItemHandler(inputValue);
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={itemQuantityInput}
        label="Amount"
        // type={props.type}
        input={{
          id: "amount_" + props.id, // this changed!
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />

      <button>+ Add</button>
    </form>
  );
};

export default MealItemForm;
