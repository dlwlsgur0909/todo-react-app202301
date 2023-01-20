import React from "react";

// props : 부모 컴포넌트가 보내준 데이터가 담긴 객체 
// 디스트럭쳐링을 통해 props. 생략 가능 
const FoodItem = (props) => {
  
    return (
    <li>
        <a href="#">{props.foodName} ({props.price}원)</a>
    </li>
  )
}


export default FoodItem