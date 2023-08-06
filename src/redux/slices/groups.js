import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

      console.log(state.groups)
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
        console.log(state, "asas")
      });
  },
});

export const { deleteGroup, createGroup, editGroup } = todoSlice.actions;
export default todoSlice.reducer;

export const getGroups = (state) => state.groups;

function isPartitionValid(groups) {
  // Rule 1: Check if the entire range of 1-10 is covered
  console.log(groups)

  const groupArr = groups.map((group) => [group.from, group.to]);
  const sortedGroups = groupArr.flat().sort((a, b) => a - b);
  const sortedArr = groupArr.sort((a, b) => a[0] - b[0]);

  console.log(sortedGroups);
  if (sortedGroups[0] !== 1 || sortedGroups[sortedGroups.length - 1] !== 10) {
    return {isValid:false, errorMessage: "All todos not present"};
  }
  console.log("groupSubset", 2, groupArr);
  // Rule 2: Check if there are no gaps between consecutive groups
  for (let i = 0; i < sortedArr.length - 1; i++) {
    const currentSubset = sortedArr[i];
    const nextSubset = sortedArr[i + 1];

    // Check for gaps
    if (currentSubset[1] + 1 !== nextSubset[0]) {
      return {isValid:false, errorMessage: "There is a gap between todos"};
    }

    // Check for overlap
    if (currentSubset[1] >= nextSubset[0]) {
      return {isValid:false, errorMessage: "There is a overlap in todos"};
    }
  }
  // All rules are satisfied
  return {isValid:true, errorMessage: ""};
}

export const getStatusAsync = createAsyncThunk(
  "groups/fetchStatus",
  async (groups) => {
    console.log(groups);
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
