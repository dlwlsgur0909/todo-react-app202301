import React, { useState, useEffect } from 'react';

// component는 대문자로 시작하는게 관례이다 
const Hello = () => {

    // 여기에 쓴 코드는 태그가 렌더링 되기전에 실행
    // const $btn = document.querySelector('.btn');
    // $btn.onclick = e => {
    //     alert('박사님 안녕~~');
    // };

    const sayHello = e => {
        console.log('sayHello!')
        // alert('박사님 안녕');

        // 상태 변수 값을 변경할 때는 직접 대입하면 안되고 
        // 상태 변경 함수를 이용해야 한다
        setNickName('척척박사'); 
    };

    const foo = () => {
        console.log('foo!');
    }

    // 일반 변수는 상태값 관리가 안됨 
    // let nickName = '익명';
    const [nickName, setNickName] = useState('익명');

    
    // 화면이 처음 렌더링(마운트)될 때, 상태값이 변경될 때 자동으로 호출됨 
    // 첫번째 파라미터 = 콜백 함수 
    // 두번때 파라미터 = 의존성 배열 (optional)
    // 빈배열 설정시 초기렌더링시 단 1회만 호출
    // 의존성 배열에 상태값을 넣으면 해당 값이 업데이트될 때 다시 호출됨 

    useEffect(() => {
        console.log('2. useEffect call!!!');
        console.log('3. nickname(useEffect) : ' + nickName);
        // console.log(`4. nickname(useEffect) ${nickName}`);

        // 정리함수 : 화면이 리렌더링 되기 직전에 호출된다 
        return () => {
            alert('cleanUp call!');
        };

    }, [nickName]);
    
    console.log('1. nickName(component) : ' + nickName); // 1번 코드가 밑에 있어도 먼저 실행된다

    // 컴포넌트 내부 실행코드 (1순위) - 화면이 렌더링 되기 전에 실행
    // 렌더링 시 실행되는 코드 (2순위)
    // useEffect에 있는 콜백 (3순위)


    // return ()에서 소괄호는 JSX문법을 통해 자바스크립트 객체로 변환된다
    return (
    <>
        <h1>{foo()}Hello ~~~ {nickName}</h1>
        <button className="btn" onClick={sayHello}>척척박사</button>
        <button className="btn" onClick={() => { alert('안녕 석사~'); setNickName('척척석사');}}>척척석사</button>
    </>
    )
}

export default Hello