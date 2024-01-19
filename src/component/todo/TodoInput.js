import React, {useState} from 'react';
import {MdAdd} from "react-icons/md";
import cn from "classnames";

import './scss/TodoInput.scss'

const TodoInput = ({addTodo}) => {
    const [open, setOpen] = useState(false);

    //할 일 입력창에 입력한 내용을 저장할 변수
    const [todoText, setTodoText] = useState('');

    const onToggle = e => {
        setOpen(!open)
    }

    const inputChangeHandler = e => {
        setTodoText(e.target.value)
    }

    const submitHandler = e => {
        e.preventDefault();
        addTodo(todoText);
        setTodoText('');
    }



    return (
        <>
            {
                open && (<div className='form-wrapper'>
                    <form className='insert-form' onSubmit={submitHandler}>
                        <input
                            type='text'
                            placeholder='할 일을 입력 후, 엔터를 누르세요!'
                            onChange={inputChangeHandler}
                            value={todoText}
                        />
                    </form>
                </div>)
            }


            <button className={cn('insert-btn', {open})} onClick={onToggle}>
                <MdAdd />
            </button>
        </>
    );
};

export default TodoInput;