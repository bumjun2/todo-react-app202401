import React, {useState} from 'react';
import TodoMain from "./TodoMain";
import TodoInput from "./TodoInput";
import TodoHeader from "./TodoHeader";

import './scss/TodoTemplate.scss'


const TodoTemplate = () => {
    /*
        리액트는 부목컴포넌트에서 자식 컴포넌트로의 데이터 이동이 반대보다 쉽기 때문에
        할 일 데이터는 상위 부모컴퍼넌트에서 처리하는 것이 좋다
     */

    const [todoList, setTodoList] = useState([
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
    ]);


    const addTodo = (text) => {
        console.log('할 일 등록 함수를 todotemplate에서 실행');

        const makeNewId = () => {
          if (todoList.length === 0) return  1;
          return todoList[todoList.length - 1].id + 1;
        };

        setTodoList([...todoList, {
            id: makeNewId(),
            title: text,
            done: false
        }]);


        console.log(todoList)
    }

    const removeTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id != id));
    }

    const checkTodo = id => {
        const copyTodoList = [...todoList];

        const foundTodo = copyTodoList.find(todo => todo.id === id);

        foundTodo.done = !foundTodo.done;

        setTodoList(copyTodoList)
    }

    const a = todoList.filter(todo => !todo.done);




    return (
        <div>
            <TodoHeader todoListLingth={a.length}/>
            <TodoMain todoList={todoList}
                      removeTodo={removeTodo}
                      checkTodo={checkTodo}/>
            <TodoInput addTodo={addTodo}/>
        </div>
    );
};

export default TodoTemplate;