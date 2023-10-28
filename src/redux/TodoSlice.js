import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid'

const TodosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
                completed: false,
            };
            state.push(newTodo);
        },
        editTodo: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },
        toggleComplete: (state, action) => {
            const todo = state.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action) => {
            return state.filter(todo => todo.id !== action.payload.id);
        },
    },
});

export const { addTodo, editTodo, toggleComplete, deleteTodo } = TodosSlice.actions;
export default TodosSlice.reducer;
