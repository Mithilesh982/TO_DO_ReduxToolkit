// models/task.js

import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

mongoose.set('strictQuery', true);

const taskSchema = new mongoose.Schema({
  name: String,
  description: String,
  complete: Boolean,
});

// Initialize mongoose-sequence with mongoose instance
const AutoIncrement = mongooseSequence(mongoose);

// Apply plugin to taskSchema with field configuration
taskSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Task = mongoose.model("Task_rentkar", taskSchema);

export default Task;
