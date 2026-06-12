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
    reorderTask(state, action) {
      const selectedListId = action.payload.listId;
      const tasks = state.byId[selectedListId].taskIds;
      let targetIndex = tasks.findIndex((y) => y === action.payload.targetId);
      const sourceIndex = tasks.findIndex((y) => y === action.payload.sourceId);
      const [movedTask] = tasks.splice(sourceIndex, 1);

      if (sourceIndex < targetIndex) {
        targetIndex--;
      }

      tasks.splice(targetIndex, 0, movedTask);
    },
    appendAtBottom(state, action) {
      const targetListId = action.payload.targetListId;
      const sourceListId = action.payload.sourceListId;
      state.byId[sourceListId].taskIds = state.byId[
        sourceListId
      ].taskIds.filter((x) => x !== action.payload.sourceTaskId);
      state.byId[targetListId].taskIds.push(action.payload.sourceTaskId);
    },
  },
});

export default listSlice.reducer;
export const {
  createList,
  addTaskId,
  deletelist,
  deleteTaskId,
  reorderTask,
  appendAtBottom,
} = listSlice.actions;
