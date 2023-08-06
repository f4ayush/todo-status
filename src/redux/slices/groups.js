import { createSlice } from "@reduxjs/toolkit";
import { isPartitionValid } from "../../utilites";

const initialState = {
  groups: [],
  isValid: true,
  status: "idle",
  error: "",
};
export const todoSlice = createSlice({
  initialState,
  name: "group",
  reducers: {
    createGroup: (state, action) => {
      const newState = [...state.groups, action.payload];
      console.log(newState);
      state.groups = newState;
    },
    editGroup: (state, action) => {
      state.groups = state.groups.map((group) => {
        if (group.id == action.payload.gId) {
          if (action.payload.from) {
            group.from = action.payload.value;
          } else if (action.payload.to) {
            group.to = action.payload.value;
          }
        }
        return group;
      });
    },
    deleteGroup: (state, action) => {
      console.log(action.payload);
      const newGroups = state.groups.filter(
        (group) => group.id != action.payload
      );
      state.groups = newGroups;
    },
    getStatus: (state, action) => {
      console.log(action);
      let { groups, todos } = action.payload;
      console.log(todos);
      const partitionCheck = isPartitionValid(groups);
      if (partitionCheck.isValid) {
        const updatedGroup = groups.map((group) => {
          let status = "";
          for (let i = group.from; i <= group.to; i++) {
            let completed = todos[i - 1]["completed"];
            status += `(${i}) ${completed},`;
          }
          return { ...group, status };
        });
        state.groups = updatedGroup;
        state.error = "";
      } else {
        state.groups = groups;
        state.error = partitionCheck.errorMessage;
      }
    },
  },
});

export const { deleteGroup, createGroup, editGroup, getStatus } =
  todoSlice.actions;
export default todoSlice.reducer;

export const getGroups = (state) => state.groups;
