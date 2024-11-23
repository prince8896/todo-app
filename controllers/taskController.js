const Task = require("../models/Task");

// Get all tasks with optional category filtering
const getAllTasks = async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category } : {};
    const tasks = await Task.find(filter);
    if(tasks.length==0){
      res.status(404).json({message:"Task not found."})
    }
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, category } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    // Validate due date
    if (dueDate && new Date(dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past." });
    }

    // Create task
    const task = new Task({ title, description, dueDate, category });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { dueDate } = req.body;

    // Validate due date
    if (dueDate && new Date(dueDate) < new Date()) {
      return res
        .status(400)
        .json({ message: "Due date cannot be in the past." });
    }

    const task = await Task.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found." });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const markTaskAsCompleted = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.completed) {
      return res.status(400).json({ message: "Task is already completed." });
    }

    task.completed = true;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  markTaskAsCompleted,
};
