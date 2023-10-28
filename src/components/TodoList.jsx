import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, editTodo, toggleComplete, deleteTodo } from '../redux/TodoSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoList() {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const [newTodo, setNewTodo] = useState('');
    const [editingId, setEditingId] = useState(null);

    const handleAddTodo = () => {
        dispatch(addTodo(newTodo));
        setNewTodo('');
    };

    const handleEditClick = (id) => {
        setEditingId(id);
    };

    const handleEditChange = (e, id) => {
        const newText = e.target.value;
        dispatch(editTodo({ id, text: newText }));
    };

    const handleSaveEdit = (id) => {
        setEditingId(null);
    };

    return (
        <div>
            <input type="text" value={newTodo} onChange={e => setNewTodo(e.target.value)} className="form-control" /> 
            <button onClick={handleAddTodo} className="btn btn-primary">Add Todo</button> 
            <ul className="list-group">
                {todos.map(todo => (
                    <li key={todo.id} className={`list-group-item ${todo.completed ? 'list-group-item-success' : ''}`}> 
                        <div className={todo.completed ? 'text-decoration-line-through' : ''}>
                            {editingId === todo.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={todo.text}
                                        onChange={(e) => handleEditChange(e, todo.id)}
                                        className="form-control"
                                    />
                                    <button onClick={() => handleSaveEdit(todo.id)} className="btn btn-primary">Save</button> 
                                </div>
                            ) : (
                                <div>
                                    {todo.text}
                                    <button onClick={() => dispatch(toggleComplete({ id: todo.id }))} className="btn btn-success">Done</button> 
                                    <button onClick={() => handleEditClick(todo.id)} className="btn btn-warning">Edit</button> 
                                    <button onClick={() => dispatch(deleteTodo({ id: todo.id }))} className="btn btn-danger">Delete</button> 
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
