import React, { useState } from 'react';
import './createtodo.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CreateTodo = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigation = useNavigate()

    const createTodo = async (e) => {
        e.preventDefault(); 

        try {
            const addTodo = await fetch('https://todo-server-9bjp.onrender.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });

            if (addTodo.ok) {
                alert('Added successfully');
                navigation('/')
            } else {
                throw new Error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="todo-card">
            <form onSubmit={createTodo}>
                <div className="input-field">
                    <h3 className="label">Title:</h3>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div className="input-field">
                    <h3 className="label">Description:</h3>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="input"
                    />
                </div>
                <div>
                    <button type="submit" className="button add-button">Add</button>
                    <Link to={'/'}><button type="button" className="button cancel-button">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default CreateTodo;
