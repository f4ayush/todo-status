import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isPartitionValid } from "../../utilites";

const initialState = {
  groups: [],
  isValid: true,
  status: "idle",
  error: ""
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
      state.groups = state.groups.map(group=>{
        if(group.id == action.payload.gId){
          if(action.payload.from){
            group.from = action.payload.value
          }else if(action.payload.to){
            group.to = action.payload.value
          }
        }
        return group
      })
    },
    deleteGroup: (state, action) => {
      console.log(action.payload);
      const newGroups = state.groups.filter(
        (group) => group.id != action.payload
      );
      state.groups = newGroups;
    },    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStatusAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStatusAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.groups = action.payload.groups;
        state.error = action.payload.error;
      });
  },
});

export const { deleteGroup, createGroup, editGroup } = todoSlice.actions;
export default todoSlice.reducer;

export const getGroups = (state) => state.groups;



export const getStatusAsync = createAsyncThunk(
  "groups/fetchStatus",
  async (groups, todos) => {
    const partitionCheck = isPartitionValid(groups)
    if (partitionCheck.isValid) {
      const updatedGroup = await groups.map(async (group) => {
        let status = "";
        for (let i = group.from; i <= group.to; i++) {
          const response = await axios({
            method: "get",
            url: `https://jsonplaceholder.typicode.com/todos/${i}`,
          });
          status += `(${i}) ${response.data.completed},`;
        }
        return { ...group, status };
      });
      console.log(await Promise.all(updatedGroup))
      return {groups: await Promise.all(updatedGroup), error: ''}
    }else{
      return {groups, error: partitionCheck.errorMessage}
    }
  }
);