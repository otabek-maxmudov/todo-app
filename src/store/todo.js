import { createSlice } from "@reduxjs/toolkit";
import { apiCall } from "./api";

const todos = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    getFromResponse: (state, action) => {
      state.todos = action.payload;
    },
    toggleTodoCompleted: (state, action) => {
      state.todos.map((item) => item.id === action.payload.id && (item.completed = !action.payload.completed));
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
  },
});

export const getTodos = () =>
  apiCall({
    url: "/todos",
    method: "get",
    onSuccess: todos.actions.getFromResponse.type,
  });

export const toggleTodo = (data) =>
  apiCall({
    url: "/todos/" + data.id,
    method: "put",
    data,
    onSuccess: todos.actions.toggleTodoCompleted.type,
    onFail: todos.actions.toggleTodoCompleted.type,
  });

export const addNewTodo = (data) =>
  apiCall({
    url: "/todos",
    method: "post",
    data,
    onSuccess: todos.actions.addTodo.type,
  });

export default todos.reducer;
