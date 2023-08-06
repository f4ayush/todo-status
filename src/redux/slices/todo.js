import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10', { method: "get" }).then(res => res.json());
    // console.info(response)
    return response;
  }
);

export default todoSlice.reducer;


export const getTodos = (state) => state.todo.todos
