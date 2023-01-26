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

    // 할 일 삭제 요청 처리
    const deleteTodo = (id) => {
        
        fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(result => {
            setTodos(result.todos);
        })
    }

    // 할 일 완료/미완료 요청 처리
    const modifyTodo = (updateTodo) => {
        fetch(`${API_BASE_URL}/${updateTodo.id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTodo)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result);
            setTodos(result);
        })
    }

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
        <TodoMain todoList={todos} remove={deleteTodo} modify={modifyTodo}/>
        <TodoInput add={addTodo}/>
    </div>
  )
}

export default TodoTemplate