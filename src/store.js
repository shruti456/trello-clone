import { configureStore } from "@reduxjs/toolkit";
import BoardReducer from "./features/board/boardSlice";
import ListReducer from "./features/list/listSlice";
import TaskReducer from "./features/task/taskSlice";

const store = configureStore({
  reducer: {
    board: BoardReducer,
    lists: ListReducer,
    tasks: TaskReducer,
  },
});

export default store;
