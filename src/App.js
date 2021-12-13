import React from 'react';
import TodoList from './components/TodoList';
import { useState, useRef, useEffect } from 'react';
import {v4 as uuid} from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {

  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef (); 

  useEffect(() => {
    const storedTodos = JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY ));
    if(storedTodos) setTodos( storedTodos );
   }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos]);
 
  function toggleTodo (id) {
    const newTodos = [...todos];
    const todo = newTodos.find(s=>s.id === id);
    todo.complete = !todo.complete;
    setTodos(newTodos);
  }

  function handleAddTodo (e) {
      const name = todoNameRef.current.value;
      if (name==='') return;

      setTodos(
        prevTodos => {
          return [...prevTodos, {id: uuid(), name: name, complete: false}]
      })
      
      todoNameRef.current.value = null;
  }

  function handleClearTodo () {
      const newTodos = todos.filter(s=> !s.complete);
      setTodos(newTodos);
  }

  return <>
    <TodoList todos={todos} toggleTodo={toggleTodo}/>
    <input type="text" ref={todoNameRef} />

    <button onClick={handleAddTodo} >Add Todo</button>
    <button onClick={handleClearTodo}>Clear Completed Todos</button>
    <div>{todos.filter(s=>!s.complete).length} left to do</div>
    </> 
   
}

export default App;
