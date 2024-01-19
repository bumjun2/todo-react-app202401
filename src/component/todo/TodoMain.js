import React from 'react';
import TodoItem from "./TodoItem";

import './scss/TodoMain.scss'

const TodoMain = ({todoList, removeTodo, checkTodo}) => {

    return (
        <ul className='todo-list'>
            {
                todoList.map(todo => <TodoItem key ={todo.id} item ={todo}
                                               removeTodo={removeTodo}
                                               checkTodo={checkTodo}/>)
            }
        </ul>
    );
};

export default TodoMain;