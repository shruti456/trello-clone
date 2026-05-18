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
    addListIdInBoard(state, action) {
      const boardId = action.payload.boardId;
      const selectedBoard = state.byId[boardId];
      if (selectedBoard) selectedBoard.listIds.push(action.payload.listId);
    },
  },
});

export default boardSlice.reducer;

export const { createBoard, addListIdInBoard } = boardSlice.actions;
