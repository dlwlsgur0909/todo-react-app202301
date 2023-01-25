import React, { useEffect, useState } from 'react';

// css 로딩
import './css/TodoTemplate.css';

// component import 
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoMain from './TodoMain';

const TodoTemplate = (todo) => {

    const API_BASE_URL = 'http://localhost:8080/api/todos';

    // 할 일 API 데이터 호출
    const [todos, setTodos] = useState([]);

    // 할 일 등록 서버 요청 
    const addTodo = (todo) => {

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(todo)
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);
        })
    };

    // 렌더링 되자마자 할 일 => todo API 호출
    useEffect(() => {
    
        fetch(API_BASE_URL)
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);
        });

    }, []);
    
  
    return (
    <div className='todo-template'>
        <TodoHeader todoList={todos}/>
        <TodoMain todoList={todos}/>
        <TodoInput add={addTodo}/>
    </div>
  )
}

export default TodoTemplate