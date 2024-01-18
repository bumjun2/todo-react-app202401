import React from 'react';
import {MdDelete, MdDone} from "react-icons/md";
import cn from "classnames";

import './scss/TodoItem.scss'

function TodoItem({item, removeTodo, checkTodo}) {

    const {id, title, done} = item;

    const removeHandler = e => {
        removeTodo(id);
    }

    const checkHandler = e => {
        checkTodo(id, done)
    }


    return (
        <li className='todo-list-item'>
            <div className={cn('check-circle', {active: done})} onClick={checkHandler}>
                {done && <MdDone />}
            </div>
            <span className={cn('text', {finish: done})}>{title}</span>
            <div className='remove' onClick={removeHandler}>
                <MdDelete />
            </div>
        </li>
    );
}

export default TodoItem;