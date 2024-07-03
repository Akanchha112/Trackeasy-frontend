import React, { useState, useEffect } from 'react';

const Todoform = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('API_ENDPOINT', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo }),
      });
      if (response.ok) {
        // Fetch todos after submission
        fetchTodos();
        setTodo(''); // Clear input field
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Function to fetch todos from the database
  const fetchTodos = async () => {
    try {
      const response = await fetch('API_ENDPOINT');
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Fetch todos when component mounts
    fetchTodos();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Enter your todo"
        />
        <button type="submit">Add Todo</button>
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
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todoform;
