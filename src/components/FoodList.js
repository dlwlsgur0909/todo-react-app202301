import React from "react";
import FoodItem from "./FoodItem";

const FoodList = () => {
  return (
    <ul>
        <FoodItem foodName="짜장면" price={6000}/>
        <FoodItem foodName="짬뽕" price={8000}/>
        <FoodItem foodName="볶음밥" price={7000}/>
        <FoodItem foodName="탕수육" price={18000}/>
    </ul>
  )
}

export default FoodList