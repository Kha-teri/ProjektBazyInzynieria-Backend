import { Router } from "express";
import {
  start,
  stop,
  getHistory,
} from "../controllers/studySessionController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.post("/start", start);
router.post("/stop/:id", stop);
router.get("/", getHistory);

export default router;
