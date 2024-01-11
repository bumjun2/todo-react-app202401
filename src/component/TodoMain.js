import React from 'react';
import TodoItem from "./TodoItem";

import './scss/TodoMain.scss'

const TodoMain = ({text}) => {
    const todoList = [
        {
            id : 1,
            title : '장보기',
            done : false
        },
        {
            id : 2,
            title : '저녁먹기',
            done : true
        },
        {
            id : 3,
            title : '수다떨기',
            done : false
        },
        {
            id : 4,
            title : '축구하기',
            done : true
        }
    ];

    todoList.push(text);


    return (
        <ul className='todo-list'>
            {
                todoList.map(todo => <TodoItem key ={todo.id} item ={todo}/>)
            }
        </ul>
    );
};

export default TodoMain;