
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false },
  dueDate: { type: Date, required: false }, // Optional due date
  category: {
    type: String,
    enum: ["Work", "Personal", "Urgent"],
    required: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);
