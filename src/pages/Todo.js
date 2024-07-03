import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [desc, setdesc] = useState('');
  const [todos, setTodos] = useState([]);

  console.log(localStorage.getItem('token'));
  const submit=(e)=>{
    e.preventDefault();
    // console.log(todo);
    // console.log(desc);

    fetch("https://trackeasy-backend.vercel.app/todo",{
            method:  "POST",
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
           body: JSON.stringify({title: todo , description: desc})
        })
        .then(async (res)=>{
          const json=await res.json()
          console.log(json)
          

        })
  }
const fetchtodo=()=>{
  fetch("https://trackeasy-backend.vercel.app/todos",{
            method:  "GET",
            headers: {"Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
           
        })
        .then(async (res)=>{
          const json=await res.json()
          console.log(json)
          setTodos(json.todos)
          // setTodos(alltodo.todos);
        })
}
  useEffect(()=>{
    fetchtodo()
  },[])



  return (
    <div>
      <form >
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your todo"
        />
        <input
          type="description"
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
          placeholder="Enter description"
        />
        <button type="submit" onClick={(e)=>{submit(e)}}>Add Todo</button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

const TodoList = ({ todos }) => {
    return (
      <div>
        <h2>Todos</h2>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <p>Title: {todo.title}</p>
              <p>Description: {todo.description}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

export default Todo;
