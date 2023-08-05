import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  groups: [],
  isValid: true,
  status: "idle",
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
      const updatedGroup = state.groups.filter((group) => group.id != action.payload.id)
      state = [...updatedGroup, action.payload]
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
        state.groups = action.payload;
        console.log(state, "asas")
      });
  },
});

export const { deleteGroup, createGroup } = todoSlice.actions;
export default todoSlice.reducer;

export const getGroups = (state) => state.groups;

function isPartitionValid(groups) {
  // Rule 1: Check if the entire range of 1-10 is covered
  const groupArr = groups.map((group) => [group.from, group.to]);
  const sortedGroups = groupArr.flat().sort((a, b) => a - b);
  console.log(sortedGroups);
  if (sortedGroups[0] !== 1 || sortedGroups[sortedGroups.length - 1] !== 10) {
    return false;
  }
  console.log("groupSubset", 2);
  // Rule 2: Check if there are no gaps between consecutive groups
  for (let i = 0; i < groupArr.length - 1; i++) {
    if (groupArr[i + 1] - groupArr[i] !== 1) {
      return false;
    }
  }
  console.log("groupSubset", 3);
  // Rule 3: Check if there is no overlap between consecutive groups
  for (let i = 0; i < groupArr.length - 1; i++) {
    const currentGroup = groupArr[i];
    const nextGroup = groupArr[i + 1];
    if (currentGroup[1] >= nextGroup[0]) {
      return false;
    }
  }

  console.log(groupArr);
  // All rules are satisfied
  return true;
}

export const getStatusAsync = createAsyncThunk(
  "groups/fetchStatus",
  async (groups) => {
    console.log(groups);
    if (isPartitionValid(groups)) {
      const updatedGroup = await groups.map(async (group) => {
        let status = "";
        for (let i = group.from; i <= group.to; i++) {
          const response = await axios({
            method: "get",
            url: `https://jsonplaceholder.typicode.com/todos/${i}`,
          });
          status += `(${i}) ${response.data.completed},`;
        }
    
        // group.taskStatus = status
        return { ...group, status };
      });
      console.log(await Promise.all(updatedGroup))
      return await Promise.all(updatedGroup)
    }
  }
);
