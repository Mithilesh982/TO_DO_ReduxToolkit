// slices/TaskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "http://localhost:4001/tasks";

// Async thunks for CRUD operations
export const fetchTasksAsync = createAsyncThunk("task/fetchTasksAsync", async () => {
  const response = await axios.get(URL);
  return response.data;
});

export const createTaskAsync = createAsyncThunk("task/createTaskAsync", async (task) => {
  const response = await axios.post(URL, task);
  return response.data;
});

export const updateTaskAsync = createAsyncThunk(
  "task/updateTaskAsync",
  async (task) => {
    const response = await axios.put(`${URL}/${task.id}`, task);
    return response.data;
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "task/deleteTaskAsync",
  async (taskId) => {
    await axios.delete(`${URL}/${taskId}`);
    return taskId;
  }
);

export const deleteAllTasksAsync = createAsyncThunk(
  "task/deleteAllTasks",
  async () => {
    await axios.delete(URL); // Assuming your server handles deleting all tasks
    return []; // Return an empty array or any default value after successful deletion
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    completeTaskReducer(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.complete = true;
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskAsync.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteAllTasksAsync.fulfilled, (state, action) => {
        state.tasks = action.payload; // Assuming your backend returns an empty array
      });
  },
});

export default taskSlice.reducer;
export const { completeTaskReducer, clearTasks } = taskSlice.actions;
