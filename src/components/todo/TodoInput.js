import React, { useState } from 'react';
import './css/TodoInput.css';
import { MdAdd } from 'react-icons/md';
import cn from 'classnames';

const TodoInput = ({add}) => {

    // todo-input 박스를 렌더링할지 여부 
    const [open, setOpen] = useState(false);

    // todo-input 박스를 열고 닫는 이벤트 핸들러
    const inputToggle = e => {
        setOpen(!open);
    };

    // 입력폼에 입력한 데이터들을 담을 상태 변수 
    const [todo, setTodo] = useState({
        title: ''
    });

    // 입력값을 실시간으로 상태 변수 todo에 저장하는 체인지 이벤트 핸들러
    const titleChangeHandler = e => {
        setTodo({
            // 여러개의 데이터를 받는 다면 spread로 기존의 데이터를 복사하고 값을 바꿔줘야 한다 
            // ...todo, 
            title: e.target.value
        });
    }

    // 할 일 입력 후 엔터치면 서버로 POST 요청을 보냄 
    const todoAddHandler = e => {
        if(e.key === 'Enter') {
            
            // 입력 데이터 읽기 
            console.log(todo);

            // 서버로 요청 보내기 (부모(template)에서 작성한 함수를 받아 매개변수를 넣어준다)
            add(todo);

            // 입력 끝나면 입력칸 비우기 
            setTodo({
                ...todo,
                title: ''
            })

        }
    }

    // submit 방지 핸들러
    const stopSubmit = e => {
        e.preventDefault();
    }

 

  return (
    <>
        { open && 
            <div className="todo-input">
                <form className="insert-form" onSubmit={stopSubmit}>
                    <input type="text" placeholder="할 일을 입력 후, 엔터를 누르세요!" autoFocus onKeyUp={todoAddHandler} onChange={titleChangeHandler} value={todo.title}/>
                </form>
            </div>
        }
        <button className={cn('begin-btn', {open})} onClick={inputToggle}>
            <MdAdd />
        </button>
    </>
  )
}

export default TodoInput