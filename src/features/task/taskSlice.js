import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    createTask(state, action) {
      const task = action.payload;
      state.allIds.push(task.id);
      state.byId[task.id] = task;
    },
  },
});

export default taskSlice.reducer;
export const { createTask } = taskSlice.actions;
