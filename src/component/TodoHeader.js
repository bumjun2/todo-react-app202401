import React from 'react';

import './scss/TodoHeader.scss'

const TodoHeader = ({todoListLingth}) => {
    return (
        <header>
            <h1>2024년 1월 10일</h1>
            <div className='day'>수요일</div>
            <div className='tasks-left'>할 일 {todoListLingth}개 남음</div>
        </header>
    );
};

export default TodoHeader;