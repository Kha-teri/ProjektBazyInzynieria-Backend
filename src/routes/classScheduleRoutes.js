import { Router } from "express";
import {
  addEntry,
  getUserSchedule,
  editEntry,
  removeEntry,
} from "../controllers/scheduleController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();
router.use(authMiddleware);

router.post("/", addEntry);
router.get("/", getUserSchedule);
router.patch("/:id", editEntry);
router.delete("/:id", removeEntry);

export default router;
