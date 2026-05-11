import * as taskService from "../services/taskService.js";

export const addTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const task = await taskService.createTask(userId, req.body);
    res.status(201).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while adding task", details: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const tasks = await taskService.getTasks(userId);
    res.json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error while fetching tasks", details: error.message });
  }
};

export const changeStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { id } = req.params;
    const { status } = req.body;
    const updatedTask = await taskService.updateTaskStatus(id, userId, status);

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error while changing task status",
      details: error.messsage,
    });
  }
};

export const removeTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    await taskService.deleteTask(id, userId);

    res.json({ message: "Task has been deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error while deleting task", details: error.message });
  }
};
