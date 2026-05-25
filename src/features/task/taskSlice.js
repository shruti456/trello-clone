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
    deleteTask(state, action) {
      const taskId = action.payload;
      state.allIds = state.allIds.filter((x) => x !== taskId);
      delete state.byId[taskId];
    },
  },
});

export default taskSlice.reducer;
export const { createTask, deleteTask } = taskSlice.actions;
