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
    deletelist(state, action) {
      state.allIds = state.allIds.filter((x) => x !== action.payload);
      delete state.byId[action.payload];
    },
    deleteTaskId(state, action) {
      const listId = action.payload.listId;
      state.byId[listId].taskIds = state.byId[listId].taskIds.filter(
        (x) => x !== action.payload.taskId,
      );
    },
  },
});

export default listSlice.reducer;
export const { createList, addTaskId, deletelist, deleteTaskId } =
  listSlice.actions;
