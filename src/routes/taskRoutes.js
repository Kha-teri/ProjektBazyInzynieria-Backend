import { Router } from "express";
import {
  addTask,
  getAllTasks,
  changeStatus,
  removeTask,
} from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/", addTask);
router.get("/", getAllTasks);
router.patch("/:id", changeStatus);
router.delete("/:id", removeTask);

export default router;
