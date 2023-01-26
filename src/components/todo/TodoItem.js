import React from 'react';
import { MdDone, MdDelete, MdOutlineDirectionsSubwayFilled } from 'react-icons/md';
import './css/TodoItem.css';
import cn from 'classnames';


const TodoItem = ({todo, remove, modify}) => {



    const {id, title, done} = todo;

    // 삭제 요청 클릭 이벤트 핸들러
    const deleteClickHandler = e => {
        remove(id);
    };



    // 할 일 완료/미완료 수정 처리 이벤트 핸들러 
    const doneCheckHandler = e => {

        const updateTodo = {
            ...todo,
            done: !done
        };
        
        modify(updateTodo);
    };

  return (
    <li className='todo-item'>
        <div className={cn('check-circle', {active: done})} onClick={doneCheckHandler}>
            { done && <MdDone /> }
        </div>
        <span className={cn('text', {finish: done})}>{title}</span>
        <div className="remove" onClick={deleteClickHandler}>
            <MdDelete />
        </div>
    </li>
  )
}

export default TodoItem