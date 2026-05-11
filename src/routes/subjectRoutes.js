import { Router } from "express";

import {
  addSubject,
  editSubject,
  getSubjects,
  removeSubject,
} from "../controllers/subjectController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getSubjects);
router.post("/", addSubject);
router.delete("/:id", removeSubject);
router.patch("/:id", editSubject);

export default router;
