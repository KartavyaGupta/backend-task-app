import express from "express";
import checkUserAuth from "../middlewares/authMiddleware.js";

import EntryController from "../controllers/entryController.js";
const router = express.Router();

router.get("/", checkUserAuth);
router.post("/", checkUserAuth);
router.get("/:id", checkUserAuth);
router.put("/:id", checkUserAuth);
router.delete("/:id", checkUserAuth);

router.get("/", EntryController.getAllTasks);
router.post("/", EntryController.createTask);
router.get("/:id", EntryController.getTaskByID);
router.put("/:id", EntryController.updateTask);
router.delete("/:id", EntryController.deleteTask);
export default router;
