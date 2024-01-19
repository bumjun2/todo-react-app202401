import React, {useEffect, useState} from 'react';
import TodoMain from "./TodoMain";
import TodoInput from "./TodoInput";
import TodoHeader from "./TodoHeader";

import './scss/TodoTemplate.scss'


const TodoTemplate = () => {

    // 서버에서 할 일 목록 (json)을 요청해서 받아와야 함
    const API_BASE_URL = 'http://localhost:8484/api/todos'

    /*
        리액트는 부목컴포넌트에서 자식 컴포넌트로의 데이터 이동이 반대보다 쉽기 때문에
        할 일 데이터는 상위 부모컴퍼넌트에서 처리하는 것이 좋다
     */

    const [todoList, setTodoList] = useState([]);


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

        const payload = {
            title : text
        }

        const requestInfo = {
            method : 'post',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(payload)
        }

        fetch(API_BASE_URL, requestInfo)
            .then(res => {
                if (res.status === 200){
                    return res.json()
                }
            })
            .then(json => {
                setTodoList(json.todos);
            })


        console.log(todoList)
    }

    const removeTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id != id));

        const requestInfo = {
            method: 'DELETE',
            headers : {
                'content-type' : 'application/json'
            }
        }

        fetch(`${API_BASE_URL}/${id}`, requestInfo)
            .then(res => {
                if (res.status === 200){
                    return res.json()
                }
            })
            .then(json => {
                setTodoList(json.todos);
            })
    }

    const checkTodo = (id, done) => {
        const copyTodoList = [...todoList];

        const foundTodo = copyTodoList.find(todo => todo.id === id);

        foundTodo.done = !foundTodo.done;

        // setTodoList(copyTodoList)
        fetch(API_BASE_URL, {
            method: 'put',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
                id : id,
                done: !done,
            })
        })
            .then(res => res.json())
            .then(json => {
                setTodoList(json.todos)
            })
    }

    const a = todoList.filter(todo => !todo.done);


    // 렌더링 되자마자 할 일
    useEffect(() => {
        fetch(API_BASE_URL)
            .then(res => res.json())
            .then(json => {
                setTodoList(json.todos);
            })
    }, []);

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