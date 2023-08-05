import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const initialState = {
    todos: [],
    status: "idle",
}

export const todoSlice = createSlice({
  initialState,
  name: "todo",
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todos = action.payload;
      })
    }
});

export const fetchTodosAsync = createAsyncThunk(
    'todo/fetchTodo',
    async () => {
        const response = await axios({
            method: "get",
            url: "https://jsonplaceholder.typicode.com/todos",
            params: {
              _limit: 10,
            },
          });
          return response.data
    }
  );

export default todoSlice.reducer;


export const getTodos = (state) => state.todo.todos
