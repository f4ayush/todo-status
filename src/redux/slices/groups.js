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
      let previousFrom = 0, previousTo = 0
      state.groups = state.groups.map((group) => {
        if (group.id == action.payload.gId) {
          if (action.payload.from) {
            group.from = action.payload.value;
          } else if (action.payload.to) {
            group.to = action.payload.value;
          }
        }
        if(group.from <= previousTo){
          state.error = "overlap found";
          group.error = true
        }else if(group.from - previousTo > 1){
          state.error = "gap found";
          group.error = true
        }else if(group.to < group.from){
          state.error = "end can not be smaller than start";
          group.error = true
        }else if(group.to >10 || group.from > 10){
          state.error = "values cant be greater than 10";
          group.error = true
        }else{
          group.error = false
          state.error = ""
        }
        previousFrom = group.from;
        previousTo = group.to
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
        state.groups = groups.map((group, index)=>{
          if(index == partitionCheck.index){
            return {...group, error:true};
          }else{
            return {...group, error:false};
          }
        });
        state.error = partitionCheck.errorMessage;

        console.log(partitionCheck, state.error,state.groups, "partition")
      }
    },
    setError:(state, action)=>{
      state.error = action.payload
    }
  },
});

export const { deleteGroup, createGroup, editGroup, getStatus, setError } =
  todoSlice.actions;
export default todoSlice.reducer;

export const getGroups = (state) => state.groups;
