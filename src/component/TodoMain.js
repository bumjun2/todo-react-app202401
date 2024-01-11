import React from 'react';
import TodoItem from "./TodoItem";

import './scss/TodoMain.scss'

const TodoMain = ({todoList, text}) => {

    return (
        <ul className='todo-list'>
            {
                todoList.map(todo => <TodoItem key ={todo.id} item ={todo}/>)
            }
        </ul>
    );
};

export default TodoMain;