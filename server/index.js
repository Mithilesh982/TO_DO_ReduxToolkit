// server.js
import express from "express";
import cors from "cors";
import connectDB from "./database/db.js";
import Task from "./schema/ToDoTask.js";

const app = express();
const PORT = 4001;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to Todo App API");
});

// Get all tasks
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    console.log("all task fetched")
    res.json(tasks);
    console.log("all task fetched")
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a task
app.post("/tasks", async (req, res) => {
  const task = new Task({
    name: req.body.name,
    description: req.body.description,
    complete: req.body.complete || false,
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
    console.log("task added")
  } catch (error) {
    res.send(error);
  }
});

// Update a task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { id },
      { ...req.body },
      { new: true }
    );
    res.json(updatedTask);
    console.log("task update with id ",id)
  } catch (error) {
    res.send(error);
  }
});

// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Task.findOneAndDelete({ id });
    res.json({ message: "Task deleted successfully" });
    console.log("Task deleted with id ",id)
  } catch (error) {
    res.send(error);
  }
});

// Clear all tasks
app.delete("/tasks", async (req, res) => {
  try {
    await Task.deleteMany({});
    res.json({ message: "All tasks deleted successfully" });
    console.log("All task Deleted")
  } catch (error) {
    res.send(error);
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
