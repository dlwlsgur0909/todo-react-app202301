import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import { BASE_URL, TODO } from '../../config/host-config';

// css 로딩
import './css/TodoTemplate.css';

// component import 
import TodoHeader from './TodoHeader';
import TodoInput from './TodoInput';
import TodoMain from './TodoMain';

import { getToken } from '../util/login-util';

const TodoTemplate = (todo) => {

    const API_BASE_URL = BASE_URL+TODO;
    const ACCESS_TOKEN = getToken();

    const headerInfo = {
        'content-type' : 'application/json',
        'Authorization': 'Bearer ' + ACCESS_TOKEN
    }

    // 할 일 API 데이터 호출
    const [todos, setTodos] = useState([]);

    // 로딩중 상태변수 
    const [loading, setLoading] = useState(true);

    // 할 일 등록 서버 요청 
    const addTodo = (todo) => {

        fetch(API_BASE_URL, {
            method: 'POST',
            headers: headerInfo,
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
            headers: headerInfo
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
            headers: headerInfo,
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
    
        fetch(API_BASE_URL, {
            method: 'GET',
            headers: headerInfo
        })
        .then(res => {
            if(res.status === 403) {
                alert('로그인이 필요한 서비스 입니다!');
                // 리다이렉트
                window.location.href = '/login';
                return
            }else if (res.status === 500) {
                alert('서버가 불안정합니다 ㅈㅅ');
            }
            return res.json();
        })
        .then(result => {
            setTodos(result.todos);

            // 로딩 완료 처리
            setLoading(false);
            
        });

    }, []);
    
    // 로딩중일 때 보여줄 태그
    const loadingPage = (
        <div className='loading'>
            <Spinner color="danger" 
            style={{
                width: '100px',
                height: '100px'
            }}>
                Loading...
            </Spinner>
        </div>
    );

    // 로딩 완료 시 보여줄 태그
    const viewPage = (
        <div className='todo-template'>
            <TodoHeader todoList={todos}/>
            <TodoMain todoList={todos} remove={deleteTodo} modify={modifyTodo}/>
            <TodoInput add={addTodo}/>
        </div>
    );
  
    return (

        <>
            { loading ? loadingPage : viewPage }
        </>
  )
}

export default TodoTemplate