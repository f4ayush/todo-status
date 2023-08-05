import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./slices/todo";
import groupsSlice from "./slices/groups";

export const store = configureStore({
  reducer: {
    todo: todoSlice,
    groups: groupsSlice
  },
});
