import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./slices/TaskSlice";

const store = configureStore({
  reducer: {
    task: taskSlice,
  },
});

export default store;
