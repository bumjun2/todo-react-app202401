import React, {useState} from 'react';
import TodoMain from "./TodoMain";
import TodoInput from "./TodoInput";
import TodoHeader from "./TodoHeader";

import './scss/TodoTemplate.scss'


const TodoTemplate = () => {
    const [text, setText] = useState(
        {
            id : 0,
            title : '',
            done : false,
        }
    );

    const inputChangeHandler = e => {
        setText({
            title : e.target.value
        })
    }

    return (
        <div>
            <TodoHeader />
            <TodoMain text={text}/>
            <TodoInput inputChangeHandler={inputChangeHandler}/>
        </div>
    );
};

export default TodoTemplate;