import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
};

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    createList(state, action) {
      const list = action.payload;
      state.allIds.push(list.id);
      state.byId[list.id] = list;
    },
    addTaskId(state, action) {
      const listId = action.payload.listId;
      const selectedList = state.byId[listId];
      if (selectedList) selectedList.taskIds.push(action.payload.taskId);
    },
  },
});

export default listSlice.reducer;
export const { createList, addTaskId } = listSlice.actions;
