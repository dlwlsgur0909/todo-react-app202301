import React from 'react'
import Item from './Item';

// 음식 메뉴 리스트 관리 
const ItemMain = () => {

    // 이 컴포넌트에서 음식 API를 호출해서 받아온다면...
    const foodArray = [
        {
            foodName: '짜장면',
            price: 6000,
            quantity: 3
        },
        {
            foodName: '탕수육',
            price: 20000,
            quantity: 2
        },
        {
            foodName: '짬뽕',
            price: 7000,
            quantity: 4
        },
    ];

    // 음식 배열 길이만큼 li태그 생성하기
    // 절차형 방식
    // const tagArray = []; // 태그를 저장할 배열 
    // const makeList = () => {
    //     for(let food of foodArray) {
    //         const {foodName, price, quantity} = food;
    //         tagArray.push(<li>음식명: {foodName}, 가격: {price}, 수량: {quantity} </li>);
    //     }
    //     return tagArray;
    // }

    // 함수형 방식
    const tagArray = foodArray.map(food => <Item key={food.foodName} foodInfo={food}/>);

  return (
    <ul>
        {tagArray}
    </ul>
  )
}

export default ItemMain