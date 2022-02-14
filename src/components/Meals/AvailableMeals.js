import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";

// const ListMeals = DUMMY_MEALS.map(
//   (meal) => <li>{meal.name}</li>
//   // <li>{meal.desription}</li>
//   // <li>{meal.price}</li>
// );
const AvailableMeals = (props) => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const mealsList = [];
  useEffect(() => {
    const mealsFirebase = async () => {
      setIsLoading(true);
      try {
        const request = await fetch(
          "https://react-learn-http-65e9f-default-rtdb.firebaseio.com/meals.json"
        );
        if (!request.ok) {
          throw new Error("Something goes wrong! Try again later");
        }
        const mealsData = await request.json((data) => console.log(data));

        for (const key in mealsData) {
          const mealObj = {
            id: key,
            key: key,
            name: mealsData[key].name,
            description: mealsData[key].description,
            price: mealsData[key].price,
          };
          mealsList.push(mealObj);
        }
        setMeals(mealsList);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
        console.error(error);
      }
    };

    mealsFirebase();
    return () => {};
  }, []);
  return (
    <Card className={classes.meals}>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <ul>
        {meals.map((meal) => (
          <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
          />
          // <li>{meal.name}</li>
        ))}
      </ul>
    </Card>
  );
};

export default AvailableMeals;
