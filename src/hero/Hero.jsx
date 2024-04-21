import React, { useEffect, useState } from 'react';

import Modal from '../modal/Modal';

const Hero = () => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://todo-server-9bjp.onrender.com/todos');
      if (!response.ok) {
        throw new Error('Failed to fetch todos');
      }
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id, newData) => {
    try {
      const response = await fetch(`https://todo-server-9bjp.onrender.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });
      if (!response.ok) {
        throw new Error('Failed to update todo');
      }
      const updatedTodos = todos.map(item => item.id === id ? { ...item, ...newData } : item);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://todo-server-9bjp.onrender.com/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete todo');
      }
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
  };

  const closeEditModal = () => {
    setSelectedTodo(null);
  };

  return (
    <div className="hero-container">
      {todos.map((item) => (
        <div key={item.id} className="hero-card">
          <h1>{item.title}</h1>
          <p>{item.description}</p>
          <div className="button-container">
            <button onClick={() => openEditModal(item)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        </div>
      ))}
      {selectedTodo && <Modal item={selectedTodo} handleEdit={handleEdit} closeModal={closeEditModal} />}
    </div>
  );
};

export default Hero;
