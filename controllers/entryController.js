import EntryModel from "../models/Entry.js";
export default class EntryController {
  static createTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      if (title && description) {
        const newTask = new EntryModel({
          title: title,
          description: description,
          userID: req.user._id,
        });
        await newTask.save();
        res.send({
          status: "success",
          message: "post created",
        });
      } else {
        res.send({
          status: "failed",
          message: "field should not be empty",
        });
      }
    } catch (error) {
      res.send({
        status: "failed",
        message: "task not created",
      });
    }
  };
  static deleteTask = async (req, res) => {
    try {
      const task = await EntryModel.findOneAndDelete({
        _id: req.params.id,
        userID: req.user._id,
      });
      if (!task) {
        return res
          .status(404)
          .json({ message: "Task not found or not authorized" });
      }
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.send({
        status: "failed",
        message: "task not deleted",
      });
    }
  };

  static getTaskByID = async (req, res) => {
    try {
      const task = await EntryModel.findOne({
        _id: req.params.id,
        userID: req.user._id,
      });
      return res.status(200).json(task);
    } catch (error) {
      res.send({
        status: "failed",
        message: "task not found",
      });
    }
  };

  static updateTask = async (req, res) => {
    try {
      const { title, description } = req.body;
      const entry = await EntryModel.findOneAndUpdate(
        { _id: req.params.id, userID: req.user._id },
        { title, description },
        { new: false }
      );
      res.send({
        status: "update",
        message: "success in updating task",
      });
    } catch (error) {
      res.send({
        status: "failed",
        message: "failed to update task",
      });
    }
  };

  static getAllTasks = async (req, res) => {
    try {
      const tasks = await EntryModel.find({ userID: req.user._id });
      return res.status(200).json(tasks);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
}
