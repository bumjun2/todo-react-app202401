import React, {useState} from 'react';
import {MdAdd} from "react-icons/md";
import cn from "classnames";

import './scss/TodoInput.scss'

const TodoInput = ({inputChangeHandler}) => {
    const [open, setOpen] = useState(false);


    const onToggle = e => {
        setOpen(!open)
    }



    return (
        <>
            {
                open && (<div className='form-wrapper'>
                    <form className='insert-form' >
                        <input
                            type='text'
                            placeholder='할 일을 입력 후, 엔터를 누르세요!'
                            onKeyDown={inputChangeHandler}
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