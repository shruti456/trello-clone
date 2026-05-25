import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  byId: {},
  allIds: [],
  activeBoardId: null,
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    createBoard(state, action) {
      const board = action.payload;
      state.byId[board.id] = board;
      state.allIds.push(board.id);
    },
    deleteBoard(state, action) {
      state.allIds = state.allIds.filter((x) => x !== action.payload);
      delete state.byId[action.payload];
    },
    addListIdInBoard(state, action) {
      const boardId = action.payload.boardId;
      const selectedBoard = state.byId[boardId];
      if (selectedBoard) selectedBoard.listIds.push(action.payload.listId);
    },
    deleteListId(state, action) {
      const boardId = action.payload.boardId;
      state.byId[boardId].listIds = state.byId[boardId].listIds.filter(
        (x) => x !== action.payload.listId,
      );
    },
  },
});

export default boardSlice.reducer;

export const { createBoard, addListIdInBoard, deleteBoard, deleteListId } =
  boardSlice.actions;
